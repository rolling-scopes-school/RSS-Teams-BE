import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/services/users.service';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  public async validate(payload: { [key: string]: string }): Promise<UserEntity> {
    return this.usersService.findOne(payload.username);
  }
}
