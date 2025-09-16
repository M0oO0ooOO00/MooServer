import { Type } from 'class-transformer';
import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
    @ApiPropertyOptional({
        description: '페이지 번호',
        example: 1,
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt({ message: '페이지는 정수여야 합니다.' })
    @Min(1, { message: '페이지는 1보다 커야 합니다.' })
    @IsOptional()
    page: number = 1;

    @ApiPropertyOptional({
        description: '페이지당 항목 수',
        example: 10,
        minimum: 1,
        maximum: 100,
    })
    @Type(() => Number)
    @IsInt({ message: '페이지 크기는 정수여야 합니다.' })
    @Min(1, { message: '페이지 크기는 1보다 커야 합니다.' })
    @Max(100, { message: '페이지 크기는 100보다 작아야 합니다.' })
    @IsOptional()
    pageSize?: number;
}
