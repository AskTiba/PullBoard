import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { GithubService } from '../github/services/github.base.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('mocked-token') },
        },
        {
          provide: GithubService,
          useValue: { getOctokit: jest.fn().mockResolvedValue({ request: jest.fn().mockResolvedValue({ data: {} }) }) },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate a token on callback', async () => {
    const mockReq = { user: { githubId: '123', username: 'testuser' } };
    const mockRes = { redirect: jest.fn() } as any;
    
    await controller.githubAuthCallback(mockReq, mockRes);
    
    expect(mockRes.redirect).toHaveBeenCalledWith(expect.stringContaining('token=mocked-token'));
  });
});
