import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppUtilities } from './app.utils';
import { TicketModule } from './ticket/ticket.module';
import { PatientModule } from './patient/patient.module';
import { PrismaModule } from './common/database/prisma/prisma.module';
import { EventsGateway } from './socket';
import { DashboardModule } from './dashboard/dashboard.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('GLOBAL_REDIS_HOST'),
          port: config.get('GLOBAL_REDIS_PORT'),
        },
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 2,
        },
      ],
    }),
    TicketModule,
    PatientModule,
    PrismaModule,
    DashboardModule,
    EventEmitterModule.forRoot({
      verboseMemoryLeak: false,
      delimiter: '.',
      wildcard: true,
    }),
  ],
  controllers: [],
  providers: [AppUtilities, EventsGateway, EventEmitter2],
  exports: [AppUtilities, EventsGateway, EventEmitter2],
})
export class AppModule {}
