import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect()
      .then(() => this.logger.log('Connected To DB...'))
      .catch((err) => this.logger.error(err));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
