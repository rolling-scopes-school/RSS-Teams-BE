import { Strategy } from 'passport-github2';
import { UserEntity } from 'src/users/models/user.entity';
import { IUser } from 'src/users/models/user.interface';
import { UsersService } from 'src/users/services/users.service';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { IGitHubProfile } from '../models/github-profile.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('CALLBACK_URL'),
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: IGitHubProfile,
  ): Promise<unknown> {
    const user: UserEntity = await this.usersService.findOne(profile.username);

    if (user) {
      return user;
    }

    return this.usersService.createUser(this.mapGitHubToLocalProfile(profile));
  }

  private mapGitHubToLocalProfile(profile: IGitHubProfile): Partial<IUser> {
    const name: string[] = profile.displayName.split(' ');

    return {
      firstName: name.shift() ?? '',
      lastName: name.shift() ?? '',
      github: profile.username,
      avatar: profile.photos.shift().value,
      email: profile.emails.shift().value,
    };
  }
}
