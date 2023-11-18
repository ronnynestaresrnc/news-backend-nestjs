import { Module } from '@nestjs/common';
import { NewsModule } from './modules/news/news.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    NewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
