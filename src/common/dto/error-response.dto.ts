import { ApiProperty } from '@nestjs/swagger';

export class ErrorDataDto {
    @ApiProperty({
        description: '에러 코드',
        type: 'string',
        example: 'NOT_FOUND',
    })
    errorCode: string;

    @ApiProperty({
        description: '에러 메시지',
        type: 'string',
    })
    message: string;

    @ApiProperty({
        description: '요청 경로',
        type: 'string',
        example: '/member/999',
        nullable: true,
    })
    path: string | null;

    @ApiProperty({
        description: '에러 발생 시각',
        type: 'string',
        format: 'date-time',
        example: '2025-01-01T00:00:00.000Z',
    })
    timestamp: string;
}

export class ErrorResponseDto {
    @ApiProperty({
        description: 'HTTP 상태 코드',
        type: 'integer',
        example: 404,
    })
    code: number;

    @ApiProperty({
        description: '에러 상세 정보',
        type: ErrorDataDto,
    })
    data: ErrorDataDto;
}
