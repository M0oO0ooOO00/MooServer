import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../../common';

export class UpdateMyProfileRequest {
    @ApiProperty({
        description: '닉네임',
        example: '야구팬123',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    nickname?: string;

    @ApiProperty({
        description: '응원 팀',
        enum: Team,
        example: Team.LG,
        required: false,
    })
    @IsOptional()
    @IsEnum(Team)
    supportTeam?: Team;
}