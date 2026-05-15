import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') || 'MISSING_ID',
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') || 'MISSING_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = {
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value,
      avatarUrl: profile.photos?.[0]?.value,
    };
    return done(null, user);
  }
}
