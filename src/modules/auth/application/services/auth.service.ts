// auth.service.ts

import { Injectable } from '@nestjs/common';
import { RegisterService } from '../uses-cases/register.service';

@Injectable()
export class AuthService {
  constructor(private readonly registerService: RegisterService) {}

  async register(username: string, email: string): Promise<void> {
    console.log(email, 'asasme');

    return this.registerService.execute(username, email);
  }
}
