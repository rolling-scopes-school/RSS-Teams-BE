import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext): Express.Request {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
