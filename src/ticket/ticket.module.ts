import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from './queue/interfaces';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE })],
  providers: [TicketService],
  controllers: [],
})
export class TicketModule {}
