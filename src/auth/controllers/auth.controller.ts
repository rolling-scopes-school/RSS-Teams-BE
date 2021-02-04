import { IUser } from 'src/users/models/user.interface';

// eslint-disable-next-line no-shadow
import { Controller, Get, Param, Redirect, Request, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

import { ENVIRONMENT } from '../constants/env.enum';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('github'))
  @Get('github')
  public async login(@Request() req: Express.Request): Promise<unknown> {
    console.log('===================== login =====================');
    return this.authService.login(req.user as IUser);
  }

  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  @Redirect('http://localhost:3000/', 302)
  public async cb(@Request() req: Express.Request): Promise<unknown> {
    console.log('===================== callback =====================');
    const token: string = (await this.authService.login(req.user as IUser)).access_token;
    const NODE_ENV: string = this.configService.get('NODE_ENV');

    const host: string =
      NODE_ENV === ENVIRONMENT.Develop ? 'http://localhost:3000' : 'https://rss-teams.web.app';

    return { url: `${host}/auth/token/${token}` };
  }

  @Get('token/:token')
  public async token(@Param('token') token: string): Promise<unknown> {
    return token;
  }
}
