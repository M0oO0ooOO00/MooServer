import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const MemberControllerSwagger = applyDecorators(ApiTags('멤버'));
