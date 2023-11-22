import { Injectable } from '@nestjs/common';
import { NewsApiService } from './news-api/news-api.service';
import { NewsAdapter } from '../adapters/news.adapter';
import { AdaptedNewsData, NewsApiResponse } from '../interfaces/news.interface';
@Injectable()
export class NewsService {
  constructor(
    private readonly newsApiService: NewsApiService,
    private readonly newsadapter: NewsAdapter,
  ) {}

  async getOtherNews(): Promise<void> {
    const apiResponse: any = await this.newsApiService.callExternalApi(
      'everything?',
      {
        q: 'insane',
      },
    );
    // Procesar datos adaptados y realizar otras operaciones}
    return apiResponse;
  }
  async searchByCategory(category: string): Promise<AdaptedNewsData[]> {
    const apiResponse: NewsApiResponse =
      await this.newsApiService.searchByCategory(category);

    const adaptResponse = this.newsadapter.adaptApiResponse(apiResponse);
    return adaptResponse;
  }
}
