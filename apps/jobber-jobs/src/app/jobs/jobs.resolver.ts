import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobsEntity } from './entities/jobs.entity';
import { JobsService } from './jobs.service';
import { ExcuteJobInput } from './dto/excute-job.input';

@Resolver()
export class JobsResolver {
  constructor(private jobsService: JobsService) {}
  @Query(() => [JobsEntity])
  async jobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => JobsEntity)
  async excuteJob(@Args('excuteJobInput') excuteJobInput: ExcuteJobInput) {
    return this.jobsService.excuteJob(excuteJobInput.name);
  }
}
