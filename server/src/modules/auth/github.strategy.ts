import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'repo'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: any,
  ) {
    const rawUser = {
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value ?? null,
      avatarUrl: profile.photos?.[0]?.value ?? null,
    };

    // 🛡️ PERSISTENCE HANDSHAKE
    // Synchronizes the GitHub OAuth data with the internal PostgreSQL DB.
    // We pass the accessToken to ensure the user's high-quota token is persisted.
    const user = await this.authService.validateUser(rawUser, accessToken);

    return {
      ...user,
      accessToken, // Keep the token for immediate session context
    };
  }
}
