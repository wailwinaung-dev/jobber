import { Module } from '@nestjs/common';
import { ExcutorController } from './excutor.controller';

@Module({
  controllers: [ExcutorController],
})
export class ExcutorModule {}
