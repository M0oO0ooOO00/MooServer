import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const GetMemberByIdSwagger = applyDecorators(
    ApiOperation({
        summary: '특정 회원 기본 정보 조회',
        description: '관리자가 특정 회원의 기본 정보를 조회합니다.',
    }),
    ApiParam({
        name: 'id',
        type: 'integer',
        description: '조회할 회원의 ID',
        example: 1,
    }),
    ApiResponse({
        status: 200,
        description: '회원 정보 조회 성공',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: '홍길동' },
                email: { type: 'string', example: 'hong@example.com' },
                birthDate: { type: 'string', example: '1990-01-01' },
                phoneNumber: { type: 'string', example: '010-1234-5678' },
                gender: { type: 'string', example: 'MALE' },
                role: { type: 'string', example: 'USER' },
                createdAt: { 
                    type: 'string', 
                    format: 'date-time',
                    example: '2024-01-01T09:00:00Z'
                },
                updatedAt: { 
                    type: 'string', 
                    format: 'date-time',
                    example: '2024-01-01T09:00:00Z'
                },
                reports: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            reportType: { type: 'string', example: '스팸/도배' },
                            content: { type: 'string', example: '신고 내용' },
                        },
                    },
                },
            },
        },
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