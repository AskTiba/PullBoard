import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthModule } from './auth.module';
import { GithubStrategy } from './github.strategy';
import { ConfigService } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(ConfigService)
      .useValue({ get: (key: string) => 'test-value' })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/github (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/github')
      .expect(302);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
