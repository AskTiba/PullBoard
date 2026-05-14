import { Module } from '@nestjs/common';
import { PrService } from './services/pr.service';
import { PrController } from './controllers/pr.controller';
import { RepoService } from './services/repo.service';
import { RepoController } from './controllers/repo.controller';
import { ReviewService } from './services/review.service';
import { ReviewController } from './controllers/review.controller';

@Module({
  controllers: [PrController, RepoController, ReviewController],
  providers: [PrService, RepoService, ReviewService],
})
export class GithubModule {}
