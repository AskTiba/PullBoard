import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 🛡️ STANDARD PG ADAPTER RESTORATION
    // We use the industry-standard 'pg' driver for maximum stability 
    // and direct TCP connectivity to Neon.
    const url = process.env.DATABASE_URL?.trim().replace(/^["']|["']$/g, '');
    
    if (!url) {
      throw new Error("DATABASE_URL is missing or empty. Mission Critical failure.");
    }
    
    const pool = new Pool({ 
      connectionString: url,
      ssl: {
        rejectUnauthorized: false // Required for Neon cloud connections
      }
    });
    
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
