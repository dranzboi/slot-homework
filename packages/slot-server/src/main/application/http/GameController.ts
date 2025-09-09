import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put} from "@nestjs/common";
import {SlotServer} from '../service/SlotServer';
import {NewSession} from "../dto/NewSession";
import {RollRequest} from "../dto/RollRequest";

@Controller()
export class GameController {

    constructor(
        protected readonly slotServer: SlotServer
    ) {}
    
    @Get("session/:id")
    session(@Param('id', new ParseUUIDPipe()) sessionId) {
        return this.slotServer.findSession({sessionId});
    }
    
    @Post("session")
    startGameSession(@Body() body: NewSession) {
        return this.slotServer.startGameSession(body);
    }
    
    @Delete("session/:id")
    closeGameSession(@Param('id', new ParseUUIDPipe()) sessionId) {
        return this.slotServer.closeGameSession({sessionId});
    }
    
    @Put("roll")
    roll(@Body() body: RollRequest) {
        return this.slotServer.roll(body);
    }
}