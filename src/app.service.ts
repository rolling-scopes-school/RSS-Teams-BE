import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  public getHello(): string {
    const NODE_ENV: string = this.configService.get('NODE_ENV');

    return `Server is alive! on ${NODE_ENV}`;
  }
}
