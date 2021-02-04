import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
