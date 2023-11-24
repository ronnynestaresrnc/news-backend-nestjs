import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { User } from '../../domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    const prisma = this.prismaService.getPrisma();

    const createdUser = await prisma.table_user.create({
      data: {
        username: user.username,
        email: user.email,
        // Otras propiedades según tu modelo de datos
      },
    });

    return createdUser;
  }

  async findUserByUsername(email: string) {
    if (!email) {
      // Manejar el caso donde el correo electrónico es nulo o indefinido
      throw new Error('Email is required for user lookup.');
    }

    const prisma = this.prismaService.getPrisma();

    return prisma.table_user.findUnique({
      where: {
        email,
        // ... otras condiciones ...
      },
    });
  }

  async deleteUser(userId: number): Promise<void> {
    const prisma = this.prismaService.getPrisma();

    await prisma.table_user.delete({
      where: { id: userId },
    });
  }
}
