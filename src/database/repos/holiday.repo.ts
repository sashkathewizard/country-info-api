import { Injectable } from '@nestjs/common';
import { Holiday } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HolidayRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string): Promise<Holiday | null> {
    return this.prisma.holiday.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  findAll(where): Promise<Holiday[]> {
    return this.prisma.holiday.findMany({
      where,
      include: { user: true },
    });
  }

  create(data: Omit<Holiday, 'id'>): Promise<Holiday> {
    return this.prisma.holiday.create({
      data,
      include: { user: true },
    });
  }

  update(id: string, data: Partial<Holiday>): Promise<Holiday> {
    return this.prisma.holiday.update({
      where: { id },
      data,
      include: { user: true },
    });
  }

  delete(id: string): Promise<Holiday> {
    return this.prisma.holiday.delete({
      where: { id },
      include: { user: true },
    });
  }
}
