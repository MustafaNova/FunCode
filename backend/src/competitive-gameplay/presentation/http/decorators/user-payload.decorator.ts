import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithUser extends Request {
    user: { userId: string; username: string };
}
export const UserPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req: RequestWithUser = ctx.switchToHttp().getRequest();

        return {
            userId: req.user.userId,
            username: req.user.username,
        };
    },
);
