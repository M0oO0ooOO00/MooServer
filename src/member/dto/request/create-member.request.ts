import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberRequest {
    @ApiProperty({ description: '이름', example: '홍길동' })
    name: string;

    @ApiProperty({ description: '유저 이메일', example: 'test1@test.com' })
    email: string;
}
