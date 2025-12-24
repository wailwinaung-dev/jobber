import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'FibonacciJob',
  description: 'Fibonacci Job',
})
export class FibonacciJob extends AbstractJob {}
