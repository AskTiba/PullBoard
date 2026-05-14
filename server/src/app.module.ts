import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GithubModule } from './modules/github/github.module';

@Module({
  imports: [AuthModule, GithubModule],
})
export class AppModule {}
