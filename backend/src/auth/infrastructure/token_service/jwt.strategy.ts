import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

interface JwtPayload {
    userId: string;
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.token,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: 'test',
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload) {
        const token = req.cookies?.token
        return {
            userId: payload.userId,
            username: payload.username,
            token
        };
    }
}
