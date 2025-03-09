import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { RegisterPatientDTO } from './dto/register-patient.dto';
import { AppUtilities } from 'src/app.utils';
import { CheckInPatientDTO } from './dto/check_in.dto';
import { Patient, PrismaClient, TicketStatus } from '@prisma/client';
import * as moment from 'moment';
import { QueueProducer } from 'src/ticket/queue/producer';

@Injectable()
export class PatientService {
  protected logger: Logger;
  constructor(
    private prisma: PrismaService,
    private queueProducer: QueueProducer,
  ) {
    this.logger = new Logger(PatientService.name);
  }

  async registerPatient(data: RegisterPatientDTO) {
    try {
      const existingPatient = await this.prisma.patient.findFirst({
        where: { email: data.email },
      });

      if (existingPatient) {
        throw new ConflictException('Patient with this email already exists');
      }

      const regNum = AppUtilities.generateNoString(5);

      return await this.prisma.patient.create({
        data: {
          ...data,
          regNum,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new ConflictException(error.message);
    }
  }

  async checkInPatient({ regNum }: CheckInPatientDTO) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { regNum },
        select: { id: true, regNum: true },
      });

      if (!patient) {
        throw new NotFoundException(
          'Patient with this registration number does not exist',
        );
      }

      const activeTicket = await this.prisma.queueTicket.findFirst({
        where: {
          patientId: patient.id,
          status: TicketStatus.CheckedIn,
          ticketDate: { gt: moment().utc().startOf('day').toDate() },
        },
        select: { id: true },
      });

      if (activeTicket) {
        throw new ConflictException(
          'Patient already has an active ticket for today',
        );
      }

      const ticketNumber = await this.generateTicketNumber(patient.regNum);

      return await this.prisma.$transaction(async (prisma: PrismaService) => {
        const ticket = await prisma.queueTicket.create({
          data: {
            ticketNumber,
            patient: { connect: { id: patient.id } },
          },
        });

        await this.queueProducer.queuePatients({
          patientId: patient.id,
          ticketId: ticket.id,
        });

        return ticket;
      });
    } catch (error) {
      this.logger.error(error);
      throw new NotAcceptableException(error.message);
    }
  }

  private async generateTicketNumber(regNum: string) {
    const random = Math.floor(Math.random() * 1000);
    return [random, String().padStart(5, regNum)].join('');
  }
}
