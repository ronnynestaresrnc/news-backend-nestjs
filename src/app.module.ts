import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/application/services/auth.service';
import { PrismaService } from './modules/auth/adapters/db/prisma/prisma.service';
import { UserRepository } from './modules/auth/adapters/db/user.repository.prisma';
import { RegisterService } from './modules/auth/application/uses-cases/register.service';
@Module({
  imports: [
    NewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [AuthService, PrismaService, UserRepository, RegisterService],
})
export class AppModule {}
