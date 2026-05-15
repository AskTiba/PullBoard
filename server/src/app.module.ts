import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GithubModule } from './modules/github/github.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    GithubModule,
  ],
})
export class AppModule {}
