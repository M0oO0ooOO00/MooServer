import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMemberRequest } from '../dto/request/create-member.request';

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
        description: '회원가입 성공 후 반환하는 데이터',
    }),
);
