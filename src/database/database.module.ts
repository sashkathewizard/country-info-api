import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repos/user.repo';
import { HolidayRepository } from './repos/holiday.repo';

@Module({
  providers: [PrismaService, UserRepository, HolidayRepository],
  exports: [UserRepository, HolidayRepository],
})
export class DatabaseModule {}
