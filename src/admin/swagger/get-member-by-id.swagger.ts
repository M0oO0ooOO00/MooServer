import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MemberDetailResponse } from '../dto';

export const GetMemberByIdSwagger = applyDecorators(
    ApiOperation({
        summary: '회원 상세 정보 조회',
        description:
            '관리자가 특정 회원의 상세 정보를 조회합니다. 회원 기본 정보, 경고 기록, 신고 기록 등이 포함됩니다.',
    }),
    ApiParam({
        name: 'memberId',
        type: 'integer',
        description: '조회할 회원의 ID',
        example: 1,
    }),
    ApiResponse({
        status: 200,
        description: '회원 상세 정보 조회 성공',
        type: MemberDetailResponse,
    }),
    ApiResponse({
        status: 404,
        description: '존재하지 않는 회원',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: {
                    type: 'string',
                    example: '존재하지 않는 회원입니다.',
                },
                error: { type: 'string', example: 'Not Found' },
            },
        },
    }),
    ApiResponse({
        status: 401,
        description: '인증되지 않은 사용자',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Unauthorized' },
            },
        },
    }),
    ApiResponse({
        status: 403,
        description: '권한 없음 (관리자만 접근 가능)',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 403 },
                message: { type: 'string', example: 'Forbidden resource' },
                error: { type: 'string', example: 'Forbidden' },
            },
        },
    }),
);
