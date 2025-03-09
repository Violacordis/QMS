import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

export class TicketService {
  protected logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger(TicketService.name);
  }
}
