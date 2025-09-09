import {IsOptional, IsUUID} from "class-validator";

export class NewSession {

    @IsUUID()
    @IsOptional()
    readonly accountId?: string;
}