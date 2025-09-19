import { Gender, Team } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SignUpCompleteRequestDto {
    @ApiProperty({ description: '회원 ID', type: 'integer', example: 1 })
    @IsInt()
    @IsNotEmpty()
    memberId: number;

    @ApiProperty({
        description: '닉네임',
        type: 'string',
        example: '야구매니아',
    })
    @IsString()
    @IsNotEmpty()
    nickName: string;

    @ApiProperty({
        description: '생년월일',
        type: 'string',
        format: '1995-09-15',
    })
    @IsString()
    @IsNotEmpty()
    birthDate: string;

    @ApiProperty({
        description: '전화번호',
        type: 'string',
        example: '010-1234-5678',
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({ description: '성별', enum: Gender, example: Gender.MALE })
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiProperty({
        description: '응원하는 야구팀',
        enum: Team,
        example: Team.DOOSAN,
    })
    @IsEnum(Team)
    @IsNotEmpty()
    supportTeam: Team;
}
