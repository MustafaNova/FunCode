import { IsString } from 'class-validator';

export class JoinRequest {
    @IsString()
    userId: string;
}
