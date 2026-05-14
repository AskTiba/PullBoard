import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews(
    @Query('owner') owner: string,
    @Query('repo') repo: string,
    @Query('pullNumber') pullNumber: number,
  ) {
    if (!owner || !repo || !pullNumber) {
      return { message: 'Owner, repo, and pullNumber are required' };
    }
    return this.reviewService.getReviews(owner, repo, Number(pullNumber));
  }
}
