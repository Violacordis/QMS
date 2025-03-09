import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TicketService } from './ticket.service';

@ApiTags('Queue Ticket ')
@Controller('ticket/patient')
export class TicketController {
  constructor(private ticketService: TicketService) {}
}
