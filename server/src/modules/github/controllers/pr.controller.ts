import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PrService } from '../services/pr.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('prs')
@UseGuards(JwtAuthGuard)
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Get()
  async getPRs(@Query('username') username: string) {
    if (!username) return { message: 'Username is required' };
    return this.prService.getAllPRsForUser(username);
  }
}
