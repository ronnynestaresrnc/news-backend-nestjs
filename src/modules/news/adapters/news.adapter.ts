import { Injectable } from '@nestjs/common';
import { AdaptedNewsData, NewsApiResponse } from '../interfaces/news.interface';
@Injectable()
export class NewsAdapter {
  adaptApiResponse(apiResponse: NewsApiResponse): AdaptedNewsData[] {
    console.log('veriffiacnoassimuen', apiResponse.articles);
    return apiResponse.articles.map((article) => ({
      source: {
        id: article.author || '', // Manejo de nulos para el id del autor
        name: article.source.name || '', // Manejo de nulos para el nombre de la fuente
      },
      author: article.author || '',
      title: article.title || '',
      description: article.description || '',
      urlToImage: article.urlToImage || '',
      publishedAt: article.publishedAt || '',
      content: article.content || 'fdfdf',
    }));
  }
}
