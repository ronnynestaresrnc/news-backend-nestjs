import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { HttpModule } from '@nestjs/axios';
import { NewsApiService } from './news-api.service';
@Module({
  imports: [HttpModule],
  controllers: [NewsController],
  providers: [NewsService, NewsApiService],
})
export class NewsModule {}
