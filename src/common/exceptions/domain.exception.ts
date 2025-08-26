import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
    constructor(
        statusCode: number,
        message: string | Record<string, any>,
        public readonly errorCode?: string,
        public readonly path?: string,
    ) {
        super(
            {
                statusCode,
                errorCode: errorCode ?? HttpStatus[statusCode],
                message,
                path: path ?? null,
                timestamp: new Date().toISOString(),
            },
            statusCode,
        );
        Error.captureStackTrace(this, new.target); // BaseException의 생성자 호출은 스택 트레이스에서 제외
    }
}
