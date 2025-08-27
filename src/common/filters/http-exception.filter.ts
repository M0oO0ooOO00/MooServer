import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'node:http';
import { DomainException } from '../exceptions';

const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        if (exception instanceof DomainException) {
            const status = exception.getStatus();
            return response.status(status).json({
                code: status,
                data: exception.getResponse(),
            });
        } else if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const domainException = new DomainException(
                status,
                exception.message,
                STATUS_CODES[status],
                request.url,
            );
            return response.status(status).json({
                code: status,
                data: domainException.getResponse(),
            });
        } else {
            const domainException = new DomainException(
                500,
                (exception as Error)?.message ?? 'Unknown error occurred.',
                UNKNOWN_ERROR,
                request.url,
            );
            return response.status(500).json({
                code: 500,
                data: domainException.getResponse(),
            });
        }
    }
}
