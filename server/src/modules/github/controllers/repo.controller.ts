import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { RepoService } from '../services/repo.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('repos')
@UseGuards(JwtAuthGuard)
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Get('list')
  async getRepos(@Req() req: any, @Query('username') username: string) {
    const token = req.user?.accessToken;
    if (!username) return { message: 'Username is required' };
    return this.repoService.getRepos(username, token);
  }

  @Get('stats')
  async getRepoStats(@Req() req: any, @Query('repo') repo: string) {
    const token = req.user?.accessToken;
    if (!repo) return { message: 'Repo context is required' };
    
    // Defensive Sanitization
    const sanitizedRepo = repo.trim().replace(/\.git$/, "");
    const [owner, name] = sanitizedRepo.split('/');
    
    return this.repoService.getRepoStats(owner, name, token);
  }

  @Get('contributors')
  async getRepoContributors(@Req() req: any, @Query('repo') repo: string) {
    const token = req.user?.accessToken;
    if (!repo) return { message: 'Repo context is required' };
    
    // Defensive Sanitization
    const sanitizedRepo = repo.trim().replace(/\.git$/, "");
    const [owner, name] = sanitizedRepo.split('/');
    
    return this.repoService.getRepoContributors(owner, name, token);
  }
}
