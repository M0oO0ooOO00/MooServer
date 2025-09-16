import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateMyProfileRequest } from '../dto/request/update-my-profile.request';

export const UpdateMyProfileSwagger = applyDecorators(
    ApiOperation({
        summary: '내 프로필 수정',
        description: '닉네임과 응원 팀을 수정합니다.',
    }),
    ApiBody({
        type: UpdateMyProfileRequest,
        description: '수정할 프로필 정보',
    }),
    ApiResponse({
        status: 200,
        description: '프로필 수정 성공',
        schema: {
            type: 'object',
            properties: {
                member: {
                    type: 'object',
                    description: '회원 정보',
                },
                profile: {
                    type: 'object',
                    properties: {
                        nickname: {
                            type: 'string',
                            description: '닉네임',
                            example: '야구팬123',
                        },
                        supportTeam: {
                            type: 'string',
                            description: '응원 팀',
                            example: 'LG',
                        },
                    },
                },
                warnings: {
                    type: 'array',
                    description: '경고 목록',
                },
            },
        },
    }),
    ApiResponse({
        status: 404,
        description: '존재하지 않는 회원',
    }),
);