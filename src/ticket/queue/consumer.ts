import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { JOBS, ProcessPatientCheckInJobAttribs, QUEUE } from './interfaces';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TicketStatus } from '@prisma/client';
import { TicketService } from '../ticket.service';

@Processor(QUEUE)
export class QueueConsumer {
  protected logger: Logger;

  constructor(private ticketService: TicketService) {
    this.logger = new Logger('BillingQueueConsumer');
  }

  @Process({ name: JOBS.PATIENT_CHECKIN })
  async processPatientCheckIn({ data }: Job<ProcessPatientCheckInJobAttribs>) {
    try {
      this.logger.log('Processing patient checkin.......Serving Patient');
      await this.ticketService.serveTicket(data.ticketId, data.patientId);
      this.logger.log('Patient served successfully');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
