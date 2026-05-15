import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { GithubModule } from '../src/modules/github/github.module';
import { PrService } from '../src/modules/github/services/pr.service';
import { RepoService } from '../src/modules/github/services/repo.service';
import { JwtAuthGuard } from '../src/modules/auth/jwt-auth.guard';

describe('Github Intelligence Integration (Board & Dashboard)', () => {
  let app: INestApplication;
  
  // Mock data matching the Hestia Elite interface
  const mockPRs = [
    { number: 1, title: 'Mock PR', user: { login: 'user1' }, state: 'open', created_at: new Date().toISOString(), labels: [], comments: 0 }
  ];

  const mockStats = {
    data: { stargazers_count: 100, forks_count: 50, open_issues_count: 10 }
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GithubModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Bypass auth for integration testing
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PR Intelligence (/prs/repo)', () => {
    it('should return sanitized PR data for a specific repository', async () => {
      // We mock the service method instead of the whole Octokit for cleaner integration tests
      const prService = app.get(PrService);
      jest.spyOn(prService, 'getRepoPRs').mockResolvedValue([
        { id: 1, title: 'Test PR', author: 'tester', repository: 'test/repo', status: 'open', createdAt: '', updatedAt: '', commentsCount: 0, reviewsCount: 0, labels: [] }
      ]);

      const response = await request(app.getHttpServer())
        .get('/prs/repo')
        .query({ repo: 'test/repo', state: 'open' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('title', 'Test PR');
    });
  });

  describe('Repository Intelligence (/repos/stats)', () => {
    it('should return real-time metadata for the active context', async () => {
      const repoService = app.get(RepoService);
      jest.spyOn(repoService, 'getRepoStats').mockResolvedValue({
        stars: 120, forks: 45, openIssues: 5, totalPRs: 200, mergedPRs: 150, contributors: 12
      });

      const response = await request(app.getHttpServer())
        .get('/repos/stats')
        .query({ repo: 'test/repo' })
        .expect(200);

      expect(response.body).toHaveProperty('stars', 120);
      expect(response.body).toHaveProperty('totalPRs', 200);
    });
  });

  describe('Contributor Intelligence (/repos/contributors)', () => {
    it('should return the contributor grid for the active context', async () => {
      const repoService = app.get(RepoService);
      jest.spyOn(repoService, 'getRepoContributors').mockResolvedValue([
        { id: '1', name: 'tester', role: 'Contributor', avatar: 'T', prsMerged: 10, reviewCount: 5, responsiveness: '1h', status: 'online' }
      ]);

      const response = await request(app.getHttpServer())
        .get('/repos/contributors')
        .query({ repo: 'test/repo' })
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('name', 'tester');
    });
  });
});
