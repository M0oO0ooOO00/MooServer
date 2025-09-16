import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberService } from '../../member/service';
import { MemberDetailResponse } from '../dto';
import { PostType } from '../../common';

@Injectable()
export class AdminService {
    constructor(private readonly memberService: MemberService) {}

    async getMemberDetail(memberId: number): Promise<MemberDetailResponse> {
        const memberDetailData =
            await this.memberService.findMemberDetailForAdmin(memberId);

        return MemberDetailResponse.from(
            memberDetailData.member,
            memberDetailData.profile,
            memberDetailData.warnRecords.map((record) => ({
                warn: record.warn,
                post: record.post
                    ? {
                          ...record.post,
                          postType: this.mapPostTypeFromString(
                              record.post.post_type,
                          ),
                      }
                    : null,
            })),
            memberDetailData.reportingRecords.map((record) => ({
                report: record.report,
                reportedMember: record.reportedMember,
                post: record.post
                    ? {
                          ...record.post,
                          postType: this.mapPostTypeFromString(
                              record.post.post_type,
                          ),
                      }
                    : null,
            })),
            memberDetailData.reportedRecords.map((record) => ({
                report: record.report,
                reporterMember: record.reporterMember,
                post: record.post
                    ? {
                          ...record.post,
                          postType: this.mapPostTypeFromString(
                              record.post.post_type,
                          ),
                      }
                    : null,
            })),
            memberDetailData.statistics,
        );
    }

    private mapPostTypeFromString(postTypeString: string): PostType {
        switch (postTypeString) {
            case 'RECRUITMENT':
                return PostType.RECRUITMENT;
            case 'TIPS':
                return PostType.TIPS;
            default:
                throw new BadRequestException(
                    '게시글 타입이 올바르지 않습니다.',
                );
        }
    }
}
