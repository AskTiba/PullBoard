import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Identity & Persistence Smoke Test (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/github (GET) - Should redirect to GitHub for Identity Resolution', () => {
    return request(app.getHttpServer())
      .get('/auth/github')
      .expect(302)
      .expect('Location', /github.com\/login\/oauth\/authorize/);
  });

  it('/auth/me (GET) - Should return 401 for unauthenticated requests', () => {
    return request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
