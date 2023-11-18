import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsApiService {
  private apiKey: string;
  private baseUrl: string;
  //aaecfde91dfb446fa6358af0c31ad637   g
  //321e9be269d74e499ebb0a75a0642979     h
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NEWS_API_KEY');
    this.baseUrl = this.configService.get<string>('NEWS_API_BASE_URL');
  }
  private handleError(error: any) {
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

  private async performRequest(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<any> {
    try {
      const response = await this.httpService
        .get(this.getFullUrl(endpoint), {
          params,
          headers: { 'X-Api-Key': this.apiKey },
        })
        .toPromise();

      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async callExternalApi(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<any> {
    const response = await this.performRequest(endpoint, params);
    return response.data;
  }

  // custom methods
  public async searchByCategory(category: string): Promise<any> {
    const body = { category };
    const response = await this.callExternalApi('top-headlines', body);
    console.log('si claro q si ==' + body.category);
    return response;
  }
}
