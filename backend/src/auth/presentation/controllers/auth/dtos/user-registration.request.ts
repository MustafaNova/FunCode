import { IsString, IsEmail, MinLength } from 'class-validator';

export class UserRegistrationReq {
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @MinLength(8)
    password: string;
    @MinLength(8)
    passwordRepeat: string;
}
