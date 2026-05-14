import { Controller, Get, Query } from '@nestjs/common';
import { PrService } from '../services/pr.service';

@Controller('prs')
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Get()
  async getPRs(@Query('username') username: string) {
    if (!username) return { message: 'Username is required' };
    return this.prService.getAllPRsForUser(username);
  }
}
