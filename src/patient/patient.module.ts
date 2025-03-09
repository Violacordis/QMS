import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TicketModule],
  providers: [PatientService, PrismaService],
  controllers: [PatientController],
})
export class PatientModule {}
