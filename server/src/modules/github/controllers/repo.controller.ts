import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RepoService } from '../services/repo.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('repos')
@UseGuards(JwtAuthGuard)
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  async getRepos(@Query('username') username: string) {
    if (!username) return { message: 'Username is required' };
    return this.repoService.getRepos(username);
  }
}
