import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface joinReq extends Request {
    user: { userId: string; username: string };
}
export const UserPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req: joinReq = ctx.switchToHttp().getRequest();

        return {
            userId: req.user.userId,
            username: req.user.username,
        };
    },
);
