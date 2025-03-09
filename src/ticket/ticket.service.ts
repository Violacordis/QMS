import { Logger } from '@nestjs/common';
import { TicketStatus } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

export class TicketService {
  protected logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger(TicketService.name);
  }

  async serveTicket(ticketId: string, patientId: string) {
    const ticket = await this.prisma.queueTicket.findFirst({
      where: { id: ticketId, patientId: patientId },
    });

    if (!ticket) {
      this.logger.log('Ticket not found');
      return;
    }

    await this.prisma.queueTicket.update({
      where: { id: ticket.id },
      data: { status: TicketStatus.Served },
    });
  }
}
