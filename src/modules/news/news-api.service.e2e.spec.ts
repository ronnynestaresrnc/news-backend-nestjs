// newsapiservice.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NewsApiService } from './services/news-api/news-api.service';
import { HttpService, HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

const mockApiResponse = {
  articles: [
    { title: 'Article 1', description: 'Description 1' },
    { title: 'Article 2', description: 'Description 2' },
    // ... más datos simulados ...
  ],
  // ... otros campos simulados ...
};

describe('NewsApiService', () => {
  let newsApiService: NewsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        NewsApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => '321e9be269d74e499ebb0a75a0642979'), // Replace with your actual API key
          },
        },
      ],
    }).compile();

    newsApiService = module.get<NewsApiService>(NewsApiService);
  });

  it('should be defined', () => {
    expect(newsApiService).toBeDefined();
  });

  it('should make API call when searching by category', async () => {
    // Mock the performRequest method to simulate a successful API response
    jest.spyOn(newsApiService as any, 'performRequest').mockResolvedValue({
      data: mockApiResponse,
    });

    const result = await newsApiService.searchByCategory('technology');

    // Assert that the performRequest method was called with the correct parameters
    expect((newsApiService as any).performRequest).toHaveBeenCalledWith(
      'top-headlines',
      { category: 'technology', page: 3 }, // Adjust based on your actual implementation
    );

    // Assert the result based on the mocked data
    expect(result).toEqual(mockApiResponse);
  });

  // Add more tests as needed
});
