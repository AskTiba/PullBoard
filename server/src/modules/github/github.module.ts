import { Module } from '@nestjs/common';
import { PrService } from './services/pr.service';
import { PrController } from './controllers/pr.controller';

@Module({
  controllers: [PrController],
  providers: [PrService],
})
export class GithubModule {}
