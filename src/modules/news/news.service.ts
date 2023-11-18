import { Injectable } from '@nestjs/common';
import { NewsApiService } from './news-api.service';
@Injectable()
export class NewsService {
  constructor(private readonly newsApiService: NewsApiService) {}

  async getOtherNews(): Promise<void> {
    const apiResponse = await this.newsApiService.callExternalApi(
      'everything?',
      {
        q: 'insane',
      },
    );
    // Procesar datos adaptados y realizar otras operaciones}
    return apiResponse;
  }
  async searchByCategory(category: string): Promise<any> {
    const apiResponse = await this.newsApiService.searchByCategory(category);
    return apiResponse;
  }
}
