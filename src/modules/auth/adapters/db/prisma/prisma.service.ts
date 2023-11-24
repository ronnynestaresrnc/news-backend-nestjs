// infrastructure/adapters/database/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }

  async onModuleDestroy() {
    // Cierra la conexión de Prisma cuando el módulo se destruye
    await this.prisma.$disconnect();
  }
}
