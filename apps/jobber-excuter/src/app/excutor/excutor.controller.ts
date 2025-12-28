import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ExcutorController {
  @EventPattern('job.excuted')
  handleJobExecuted(data: Record<string, unknown>) {
    console.log('Job Executed Event Received:', data);
  }
}
