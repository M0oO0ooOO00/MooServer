import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const GetMembersByPageSwagger = applyDecorators(
    ApiOperation({
        summary: '회원 목록 조회 (페이지네이션)',
        description: '관리자가 회원 목록을 페이지네이션으로 조회합니다.',
    }),
    ApiQuery({
        name: 'page',
        type: 'integer',
        description: '페이지 번호 (1부터 시작)',
        example: 1,
        required: false,
    }),
    ApiQuery({
        name: 'pageSize',
        type: 'integer',
        description: '페이지당 회원 수 (기본값: 10, 최대: 100)',
        example: 10,
        required: false,
    }),
    ApiResponse({
        status: 200,
        description: '회원 목록 조회 성공',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            nickname: { type: 'string', example: '야구매니아' },
                            warningCount: { type: 'number', example: 2 },
                            reportingCount: { type: 'number', example: 5 },
                            reportedCount: { type: 'number', example: 1 },
                            joinedAt: {
                                type: 'string',
                                format: 'date-time',
                                example: '2024-01-01T09:00:00Z',
                            },
                        },
                    },
                },
                currentPage: { type: 'number', example: 1 },
                totalPages: { type: 'number', example: 10 },
                pageSize: { type: 'number', example: 10 },
                totalItems: { type: 'number', example: 100 },
            },
        },
    }),
    ApiResponse({
        status: 400,
        description: '잘못된 요청 (페이지 번호나 크기가 유효하지 않음)',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: {
                    type: 'string',
                    example: '페이지는 1보다 커야합니다.',
                },
                error: { type: 'string', example: 'Bad Request' },
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
