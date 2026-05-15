import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // Passport redirects to GitHub — this handler is intentionally empty.
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req: any, @Res() res: Response) {
    const { githubId, username, displayName, email, avatarUrl, accessToken } =
      req.user;

    const payload = {
      sub: githubId,
      username,
      displayName,
      email,
      avatarUrl,
      accessToken,
    };

    const token = this.jwtService.sign(payload);
    const clientUrl = this.configService.getOrThrow<string>('CLIENT_URL');

    res.redirect(`${clientUrl}/auth/success?token=${token}`);
  }
}
