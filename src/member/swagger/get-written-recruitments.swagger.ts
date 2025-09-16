import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PagePaginationResponse } from '../../common';
import { RecruitmentSummaryResponse } from '../dto';

export const GetWrittenRecruitmentsSwagger = applyDecorators(
    ApiOperation({
        summary: '내가 작성한 모집글 조회',
        description:
            '로그인한 회원이 작성한 모집글 목록을 페이지네이션으로 조회합니다.',
    }),
    ApiQuery({
        name: 'page',
        type: 'number',
        description: '페이지 번호 (1부터 시작)',
        example: 1,
        required: false,
    }),
    ApiQuery({
        name: 'pageSize',
        type: 'number',
        description: '페이지 크기 (기본값: 5)',
        example: 5,
        required: false,
    }),
    ApiResponse({
        status: 200,
        description: '작성한 모집글 목록 조회 성공',
        type: PagePaginationResponse<RecruitmentSummaryResponse[]>,
    }),
);