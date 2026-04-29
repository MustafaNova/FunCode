import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { GET_ACTIVE_SCREEN_PORT } from '../../../../infrastructure/uc-wiring/tokens';
import type { GetActiveScreenPort } from '../../../../application/ports/inbound/getActiveScreen.port';
import { GetLevelReq } from '@funcode/shared';

interface AuthReq extends Request {
    user: {
        userId: string;
    };
    params: GetLevelReq;
}

@Injectable()
export class LevelAccessGuard implements CanActivate {
    constructor(
        @Inject(GET_ACTIVE_SCREEN_PORT)
        private readonly ac: GetActiveScreenPort,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: AuthReq = context.switchToHttp().getRequest();
        const level = req.params.level;
        const res = await this.ac.getActiveScreen(req.user.userId);
        return res.unlockedLevel == level;
    }
}
