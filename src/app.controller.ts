// eslint-disable-next-line no-shadow
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req: Express.Request): unknown {
    return req.user;
  }
}
