import {IsOptional, IsUUID} from "class-validator";

export class RollRequest {

    @IsUUID()
    readonly sessionId: number;
}