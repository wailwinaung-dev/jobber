import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExcutorModule } from './excutor/excutor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ExcutorModule,
  ],
})
export class AppModule {}
