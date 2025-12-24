import { Module } from '@nestjs/common';
import { FibonacciJob } from './fibonacci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJob, JobsService, JobsResolver],
  exports: [],
})
export class JobsModule {}
