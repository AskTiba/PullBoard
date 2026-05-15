import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * 🛡️ UNIVERSAL IDENTITY HANDSHAKE
   * Synchronizes GitHub OAuth profile with the internal PostgreSQL identity.
   */
  async validateUser(profile: any) {
    const { githubId, username, email, avatarUrl } = profile;

    // Upsert logic: Update returning users or Create new ones in one atomic operation.
    const user = await this.prisma.user.upsert({
      where: { githubId },
      update: {
        username,
        email,
        avatarUrl,
      },
      create: {
        githubId,
        username,
        email,
        avatarUrl,
      },
    });

    return user;
  }

  /**
   * 🎫 JWT GENERATION
   * Signs a secure token containing the internal Database ID for relational integrity.
   */
  async login(user: any) {
    const payload = { 
      sub: user.id, 
      username: user.username,
      githubId: user.githubId 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
      }
    };
  }
}
