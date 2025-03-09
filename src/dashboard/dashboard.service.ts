import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsGateway } from 'src/socket';
import { TicketStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  protected logger: Logger;
  constructor(
    private prisma: PrismaService,
    private EventGateway: EventsGateway,
  ) {
    this.logger = new Logger(DashboardService.name);
  }
  @OnEvent('dashboard.summary')
  async DashboardSummary() {
    try {
      const [totalTickets, totalServedPatients, totalPatients] =
        await Promise.all([
          this.getTotalTickets(),
          this.getTotalServedTickets(),
          this.getTotalPatients(),
        ]);

      const data = {
        totalTickets,
        totalServedPatients,
        totalPatients,
      };

      this.logger.log('Pushing dashboard summary to client');
      this.EventGateway.pushMessage({
        event: 'dashboard-summary',
        message: data,
      });

      return data;
    } catch (error) {
      this.logger.error('error pushing message to client', error);
    }
  }

  async getTotalTickets() {
    const count = await this.prisma.queueTicket.count();
    return count || 0;
  }

  async getTotalServedTickets() {
    const count = await this.prisma.queueTicket.count({
      where: { status: TicketStatus.Served },
    });
    return count || 0;
  }

  async getTotalPatients() {
    const count = await this.prisma.patient.count({});
    return count || 0;
  }
}
