import {HttpException, HttpStatus} from "@nestjs/common";

export class DomainException extends HttpException {

    constructor(msg = "Illegal domain operation") {
        super(msg, HttpStatus.BAD_REQUEST);
    }
    static ifThrow(val, msg?) {
        if (val) {
            throw new DomainException(msg);
        }
    }
    static throw(msg?) {
        throw new DomainException(msg);
    }
}