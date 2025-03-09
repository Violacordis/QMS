import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { JOBS, ProcessPatientCheckInJobAttribs, QUEUE } from './interfaces';

@Processor(QUEUE)
export class QueueConsumer {
  protected logger: Logger;

  constructor() {
    this.logger = new Logger('BillingQueueConsumer');
  }

  @Process({ name: JOBS.PATIENT_CHECKIN })
  async processPatientCheckIn(data: Job<ProcessPatientCheckInJobAttribs>) {}
}
