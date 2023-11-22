import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { NewsApiResponse } from '../../interfaces/news.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NEWS_API_KEY');
    this.baseUrl = this.configService.get<string>('NEWS_API_BASE_URL');
  }

  private handleError(error: any): never {
    if (error.response && error.response.status) {
      const { status, data } = error.response;
      console.error(
        `Error en la respuesta de la API externa: ${status} - ${data}`,
      );
      throw new HttpException(
        `Error en la respuesta de la API externa: ${status} - ${data}`,
        status,
      );
    } else {
      console.error('Error al obtener datos de la API externa:', error.message);
      throw new HttpException(
        'Error al obtener datos de la API externa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private async performRequest<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(
        this.httpService.get<T>(this.getFullUrl(endpoint), {
          params,
          headers: { 'X-Api-Key': this.apiKey },
        }),
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async callExternalApi<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> {
    return this.performRequest<T>(endpoint, params);
  }

  // custom methods
  public async searchByCategory(category: string): Promise<NewsApiResponse> {
    const body = { category };
    const articles = await this.callExternalApi<NewsApiResponse>(
      'top-headlines',
      body,
    );
    return articles;
  }
}
