import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetMemberListResponse } from '../dto/response/get-member-list.response';

export const GetMembersByPageSwagger = applyDecorators(
    ApiOperation({
        summary: '회원 목록 조회 (페이지네이션)',
        description:
            '닉네임, 누적 경고 횟수, 신고횟수, 피신고횟수, 가입일자를 포함한 회원 목록을 페이지네이션으로 조회합니다.',
    }),
    ApiQuery({
        name: 'page',
        type: 'number',
        description: '페이지 번호 (1부터 시작)',
        example: 1,
    }),
    ApiResponse({
        status: 200,
        description: '회원 목록 조회 성공',
        type: GetMemberListResponse,
        isArray: false,
    }),
);
