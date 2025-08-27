import { applyDecorators } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { GetMemberResponse } from '../dto/response/get-member.response';
import { ErrorResponseDto } from '../../common/dto/error-response.dto';

export const GetMemberSwagger = applyDecorators(
    ApiOperation({
        summary: '특정 회원 정보 조회',
        description: '특정 회원의 상세 정보를 ID로 조회합니다.',
    }),
    ApiParam({
        name: 'id',
        type: 'number',
        description: '회원 ID',
        example: 1,
    }),
    ApiOkResponse({
        type: GetMemberResponse,
        description: '회원 정보 조회 성공',
    }),
    ApiBadRequestResponse({
        type: ErrorResponseDto,
        description: '잘못된 요청 (유효하지 않은 ID)',
        example: {
            code: 400,
            data: {
                errorCode: 'BAD_REQUEST',
                message: '유효하지 않은 회원 ID 형식입니다.',
                path: '/member/invalid-id',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
    ApiNotFoundResponse({
        type: ErrorResponseDto,
        description: '존재하지 않는 회원',
        example: {
            code: 404,
            data: {
                errorCode: 'NOT_FOUND',
                message: '존재하지 않는 회원입니다.',
                path: '/member/999',
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
                path: '/member/1',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
);
