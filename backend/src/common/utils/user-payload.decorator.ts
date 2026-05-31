import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IsString } from 'class-validator';

interface reqWithUser extends Request {
    user: { userId: string; username: string, token: string };
}
export const UserPayload = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req: reqWithUser = ctx.switchToHttp().getRequest();

        return {
            userId: req.user.userId,
            username: req.user.username,
            token: req.user.token,
        };
    },
);

export class AuthUser {
    @IsString()
    userId: string;

    @IsString()
    username: string;

    @IsString()
    token: string;
}
