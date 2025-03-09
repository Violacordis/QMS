import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from './queue/interfaces';
import { QueueConsumer } from './queue/consumer';
import { QueueProducer } from './queue/producer';
import { TicketController } from './ticket.controller';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

@Module({
  imports: [BullModule.registerQueue({ name: QUEUE })],
  providers: [TicketService, QueueConsumer, QueueProducer, PrismaService],
  exports: [QueueProducer, QueueConsumer],
  controllers: [TicketController],
})
export class TicketModule {}
