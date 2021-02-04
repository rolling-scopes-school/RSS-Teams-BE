import { IUser } from 'src/users/models/user.interface';
import { UsersService } from 'src/users/services/users.service';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  public async login(user: IUser): Promise<{ access_token: string }> {
    const payload: { [key: string]: string } = { username: user.github, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
