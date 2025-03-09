import { PrismaClient } from '@prisma/client';

export const QUEUE = 'ticket:';

export enum JOBS {
  PATIENT_CHECKIN = 'patientCheckin',
}

export interface ProcessPatientCheckInJobAttribs {
  patientId: string;
  ticketId: string;
}
