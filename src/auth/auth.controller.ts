import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IAuth } from 'src/auth/auth.interface';
import { AuthService } from 'src/auth/auth.service';
import { IUser } from 'src/users/users.interface';
import { response } from 'src/utils';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() auth: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(auth);
    res.setHeader('Set-Cookie', [data.cookie]);
    res.setHeader('token', data.token);
    res.json({ data: data.data, success: true, message: 'login successful'});
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() auth: SignUpDto, @Res() res) {
    const data = await this.authService.signup(auth);
    res.setHeader('Set-Cookie', [data.cookie]);
    res.setHeader('token', data.token);
    res.json({ data: data.data, success: true, message: 'Registration Successful' });
  }
}
