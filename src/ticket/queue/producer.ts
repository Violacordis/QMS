import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue, JobOptions } from 'bull';
import { JOBS, ProcessPatientCheckInJobAttribs, QUEUE } from './interfaces';

@Injectable()
export class QueueProducer {
  protected logger: Logger;

  constructor(
    @InjectQueue(QUEUE)
    private readonly ticketQueue: Queue,
  ) {
    this.logger = new Logger('QueueConsumer');
  }

  async queuePatients(data: ProcessPatientCheckInJobAttribs) {
    console.log('Queueing patients');
    await this.addToQueue(JOBS.PATIENT_CHECKIN, data, {
      removeOnComplete: true,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 30 * 1000, // 30 secs
      },
    });
  }

  private async addToQueue(jobName: JOBS, data: any, opts?: JobOptions) {
    return this.ticketQueue.add(jobName, data, opts);
  }
}
