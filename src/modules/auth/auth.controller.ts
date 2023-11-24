import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUserService: AuthService) {}

  @Post('register')
  async register(
    @Body() requestBody: { username: string; email: string },
  ): Promise<void> {
    const { username, email } = requestBody;

    try {
      await this.registerUserService.register(username, email);
    } catch (error) {
      // Manejo de la excepción
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
