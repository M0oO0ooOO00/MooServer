import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateMemberResponse, CreateMemberRequest } from '../dto';
import { ErrorResponseDto } from '../../common';

export const CreateMemberSwagger = applyDecorators(
    ApiOperation({
        summary: '회원가입',
        description: '새로운 멤버 생성',
    }),
    ApiBody({
        type: CreateMemberRequest,
        description: '회원가입시 필요한 데이터',
    }),
    ApiCreatedResponse({
        type: CreateMemberResponse,
        description: '회원가입 성공 후 반환하는 데이터',
    }),
    ApiBadRequestResponse({
        type: ErrorResponseDto,
        description: '유효성 검사 실패 (필수 값 누락, 형식 오류 등)',
        example: {
            code: 400,
            data: {
                errorCode: 'BAD_REQUEST',
                message:
                    '유효성 검사 실패: 이름은 필수입니다, 이메일 형식이 올바르지 않습니다.',
                path: '/member',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
    ApiConflictResponse({
        type: ErrorResponseDto,
        description: '이미 존재하는 이메일',
        example: {
            code: 409,
            data: {
                errorCode: 'CONFLICT',
                message: '이미 존재하는 이메일입니다.',
                path: '/member',
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
                path: '/member',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
);
