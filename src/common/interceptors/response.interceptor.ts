import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
import { CommonResponse } from '../response/common.response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const transformResponse = (data: unknown) => {
            const req = context.switchToHttp().getRequest<Request>();
            const res = context.switchToHttp().getResponse<Response>();

            const { statusCode } = this.parseMetadatas(req, res);

            return new CommonResponse(statusCode, data);
        };

        return next.handle().pipe(map(transformResponse));
    }

    private parseMetadatas = function (req: Request, res: Response) {
        const statusCode = res.statusCode;

        const user = req?.user;
        const ip = req?.ip;
        const method = req?.method;
        const originalUrl = req?.originalUrl;

        return {
            statusCode,
            user,
            ip,
            method,
            originalUrl,
        };
    };
}
