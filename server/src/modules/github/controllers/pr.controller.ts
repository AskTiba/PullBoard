import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { PrService } from '../services/pr.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('prs')
@UseGuards(JwtAuthGuard)
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Get('user')
  async getUserPRs(@Req() req: any, @Query('username') username: string) {
    const token = req.user?.accessToken;
    if (!username) return { message: 'Username is required' };
    return this.prService.getAllPRsForUser(username, 'open', token);
  }

  @Get('repo')
  async getRepoPRs(
    @Req() req: any,
    @Query('repo') repo: string,
    @Query('state') state: 'open' | 'closed' | 'all' = 'open'
  ) {
    const token = req.user?.accessToken;
    if (!repo) return { message: 'Repo context is required' };
    
    // Defensive Sanitization: Ensure .git suffix is removed at the API boundary
    const sanitizedRepo = repo.trim().replace(/\.git$/, "");
    
    return this.prService.getRepoPRs(sanitizedRepo, state, token);
  }
}
