import { applyDecorators } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetMembersResponse } from '../dto/response/get-members.response';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';

export const GetMembersSwagger = applyDecorators(
    ApiOperation({
        summary: '전체 회원 조회',
        description: '전체 회원의 요약 정보를 조회합니다.',
    }),
    ApiOkResponse({
        type: GetMembersResponse,
        description: '회원 목록 조회 성공',
    }),
    ApiUnauthorizedResponse({
        type: ErrorResponseDto,
        description: '인증되지 않은 사용자',
        example: {
            code: 401,
            data: {
                errorCode: 'UNAUTHORIZED',
                message: '권한이 없습니다. 로그인이 필요합니다.',
                path: '/member/all',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
    ApiInternalServerErrorResponse({
        type: ErrorResponseDto,
        description: '서버 오류',
        example: {
            code: 500,
            data: {
                errorCode: 'UNKNOWN_ERROR',
                message: '알 수 없는 오류가 발생했습니다.',
                path: '/member/all',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
);
