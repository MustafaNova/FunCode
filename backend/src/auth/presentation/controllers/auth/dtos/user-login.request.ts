import { IsString, MinLength } from 'class-validator';

export class UserLoginReq {
    @IsString()
    username: string;

    @MinLength(8)
    password: string;
}
