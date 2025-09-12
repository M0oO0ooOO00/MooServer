import { ApiProperty } from '@nestjs/swagger';

export class PagePaginationResponse<T> {
    @ApiProperty({ example: 1 })
    currentPage: number;
    @ApiProperty({ example: 10 })
    totalPage: number;
    @ApiProperty({ example: 100 })
    totalCount: number;
    @ApiProperty({ type: () => Object, required: false })
    data?: T;
    constructor(
        currentPage: number,
        totalPage: number,
        totalCount: number,
        data?: T,
    ) {
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.totalCount = totalCount;
        if (data !== undefined) {
            this.data = data;
        }
    }

    static from<T>(
        data: T[],
        currentPage: number,
        pageSize: number,
        totalCount: number,
    ): PagePaginationResponse<T[]> {
        const totalPage = Math.ceil(totalCount / pageSize);
        return new PagePaginationResponse<T[]>(
            currentPage,
            totalPage,
            totalCount,
            data,
        );
    }
}
