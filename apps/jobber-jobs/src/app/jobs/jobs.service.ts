import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { JobMetadata } from '../interfaces/job-metadata.interface';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  constructor(
    private discoveryService: DiscoveryService,
    @Inject('JOB_SERVICE') private client: ClientProxy
  ) {}

  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async excuteJob(name: string) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!job) {
      throw new BadRequestException('Job not found');
    }
    await (job.discoveredClass.instance as AbstractJob).excute();
    this.client.emit('job.excuted', { name });
    return job.meta;
  }
}
