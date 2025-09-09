import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger} from '@nestjs/common';
import {Request, Response} from 'express';
import {EntityNotFoundError} from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
    
    protected readonly logger = new Logger('EntityNotFoundFilter');
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        this.logger.warn(exception.message);
        
        response
            .status(HttpStatus.NOT_FOUND)
            .json({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Not Found",
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
