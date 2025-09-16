import { applyDecorators } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiInternalServerErrorResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { GetMyProfileResponse } from '../dto';
import { ErrorResponseDto } from '../../common';

export const GetMyProfileSwagger = applyDecorators(
    ApiOperation({
        summary: '내 프로필 정보 조회',
        description:
            '로그인한 사용자의 프로필 정보(닉네임, 응원 팀, 로그인 방법, 누적 경고 횟수)를 조회합니다.',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
        type: GetMyProfileResponse,
        description: '내 프로필 정보 조회 성공',
        example: {
            nickname: '야구왕타돌이',
            supportTeam: 'LG',
            oauthProvider: 'KAKAO',
            warnCount: 0,
        },
    }),
    ApiUnauthorizedResponse({
        type: ErrorResponseDto,
        description: '인증되지 않은 사용자',
        example: {
            code: 401,
            data: {
                errorCode: 'UNAUTHORIZED',
                message: '로그인이 필요합니다.',
                path: '/member/my',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
    ApiNotFoundResponse({
        type: ErrorResponseDto,
        description: '프로필 정보를 찾을 수 없음',
        example: {
            code: 404,
            data: {
                errorCode: 'NOT_FOUND',
                message: '회원 정보를 찾을 수 없습니다.',
                path: '/member/my',
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
                path: '/member/my',
                timestamp: '2025-01-01T00:00:00.000Z',
            },
        },
    }),
);
