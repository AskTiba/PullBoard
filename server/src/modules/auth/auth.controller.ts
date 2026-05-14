import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req: any, @Res() res: Response) {
    const payload = { sub: req.user.githubId, username: req.user.username };
    const token = this.jwtService.sign(payload);
    
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
  }
}
