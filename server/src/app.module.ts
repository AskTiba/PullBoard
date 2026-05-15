import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GithubModule } from './modules/github/github.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule, 
    GithubModule,
  ],
})
export class AppModule {}
