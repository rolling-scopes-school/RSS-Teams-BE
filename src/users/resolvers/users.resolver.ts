import { User } from 'src/users/models/user.object-type';

import { Args, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  public async user(@Args('github', { type: () => String }) github: string): Promise<User> {
    console.log('github: ', github);

    return this.usersService.findOne(github);
  }

  // @ResolveField(() => Social, { name: 'social' })
  // public async social(@Parent() user: User) {
  //   const { id } = user;
  //   console.log('Social UserID: ', id);

  //   return Promise.resolve({
  //     id: 1,
  //     userId: 1,
  //     github: 'github',
  //     telegram: 'telegram',
  //     discord: 'discord',
  //   });
  // }
}
