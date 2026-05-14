import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hestia-supreme-secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
