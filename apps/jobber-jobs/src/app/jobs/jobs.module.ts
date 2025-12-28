import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonacci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@jobber/protos';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from '@jobber/nestjs';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_PACKAGE_NAME,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, 'proto/auth.proto'),
            url: config.getOrThrow<string>('GRPC_AUTH_URL'),
          },
        }),
      },
      {
        name: 'JOB_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RABBITMQ_URL')],
            queue: 'transaction_queue',
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        }),
      },
    ]),
  ],
  providers: [
    FibonacciJob,
    JobsService,
    JobsResolver,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
  exports: [],
})
export class JobsModule {}
