import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { DashboardService } from './dashboard.service';
import { EventsGateway } from 'src/socket';

@Module({
  providers: [DashboardService, PrismaService, EventsGateway],
})
export class DashboardModule {}
