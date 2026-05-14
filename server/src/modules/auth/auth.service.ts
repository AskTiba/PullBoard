import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService implements OnModuleInit {
  private firebaseApp!: admin.app.App;

  onModuleInit() {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  getFirebaseAdmin() {
    return this.firebaseApp;
  }
}
