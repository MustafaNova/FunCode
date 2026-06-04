import { CreateClanReq } from '@funcode/shared';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClanDto implements CreateClanReq {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string
}