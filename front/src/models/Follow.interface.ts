import { MEMEBER_FEATURE } from "./Enums.type";

export interface FollowParams {
  memberId: string;
}

export interface FollowResponse {
  memberId: string;
}

export interface UnfollowParams {
  memberId: string;
}

export interface UnfollowResponse {}

export interface ListFollowingParams {
  memberId: string;
  pageNo: number;
  pageSize: number;
}

export interface FollowContent {
  memberId: string;
  nickname: string;
  profileImage: string;
  feature: MEMEBER_FEATURE;
}
export interface ListFollowingResponse {
  content: FollowContent[];
  pageable: Object;
}

export interface ListFollowerParams {
  memberId: string;
  pageNo: number;
  pageSize: number;
}
export interface ListFollowerResponse {
  content: FollowContent[];
  pageable: Object;
}
