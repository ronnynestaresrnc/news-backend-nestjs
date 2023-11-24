import { Module } from '@nestjs/common';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from './adapters/db/prisma/prisma.service';
import { RegisterService } from './application/uses-cases/register.service';
import { UserRepository } from './adapters/db/user.repository.prisma';

@Module({
  providers: [AuthService, RegisterService, PrismaService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
