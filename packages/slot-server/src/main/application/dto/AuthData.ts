import {IsNotEmpty} from "class-validator";

export class AuthData {

    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    readonly password: string;
}