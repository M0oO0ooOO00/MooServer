import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetMembersResponse } from '../dto/response/get-members.response';

export const GetMembersSwagger = applyDecorators(
    ApiOperation({
        summary: '전체 회원 조회',
        description: '전체 회원의 요약 정보를 조회합니다.',
    }),
    ApiOkResponse({
        type: GetMembersResponse,
    }),
);
