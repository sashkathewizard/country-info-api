import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { holidays: true },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  create(data: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
      include: { holidays: true },
    });
  }
}
