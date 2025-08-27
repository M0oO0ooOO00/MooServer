import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetMemberResponse } from '../dto/response/get-member.response';

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
    }),
);
