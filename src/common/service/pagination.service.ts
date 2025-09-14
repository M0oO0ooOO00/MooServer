import { BadRequestException, Injectable } from '@nestjs/common';
import { PagePaginationResponse } from '../response/page-pagination.response';

@Injectable()
export class PaginationService {
    private static readonly DEFAULT_PAGE_SIZE = 10;
    private static readonly DEFAULT_RECRUITMENT_PAGE_SIZE = 5;
    private static readonly MAX_PAGE_SIZE = 100;

    validatePageNumber(page: number): void {
        if (page < 1) {
            throw new BadRequestException('페이지는 1보다 커야합니다.');
        }
    }

    validatePageSize(pageSize: number): void {
        if (pageSize < 1 || pageSize > PaginationService.MAX_PAGE_SIZE) {
            throw new BadRequestException(
                `페이지 크기는 1~${PaginationService.MAX_PAGE_SIZE} 사이여야 합니다.`,
            );
        }
    }

    createResponse<T>(
        data: T[],
        page: number,
        pageSize: number,
        totalCount: number,
    ): PagePaginationResponse<T[]> {
        this.validatePageNumber(page);
        this.validatePageSize(pageSize);

        return PagePaginationResponse.from(data, page, pageSize, totalCount);
    }

    public static getDefaultPageSize(): number {
        return PaginationService.DEFAULT_PAGE_SIZE;
    }

    public static getDefaultRecruitmentPageSize(): number {
        return PaginationService.DEFAULT_RECRUITMENT_PAGE_SIZE;
    }
}
