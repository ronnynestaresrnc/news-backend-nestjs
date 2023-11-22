import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NewsService } from './news.service';
@Controller('news')
@ApiTags('news') // Puedes agregar más tags según tus necesidades
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getOtherNews() {
    return this.newsService.getOtherNews();
  }

  @Get('category')
  async searchByCategory(@Query('category') category: string): Promise<any> {
    try {
      const result = await this.newsService.searchByCategory(category);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
}
