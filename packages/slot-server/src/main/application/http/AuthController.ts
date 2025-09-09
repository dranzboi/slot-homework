import {Body, Controller, Post} from "@nestjs/common";
import {AuthData} from "../dto/AuthData";

@Controller()
export class AuthController {

    constructor(
    ) {}
    
    @Post("auth/register")
    register(@Body() body: AuthData) {
    }
    
    @Post("session/:id")
    logion(@Body() body: AuthData) {
    }
}