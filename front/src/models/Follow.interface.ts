import { MEMEBER_FEATURE } from "./Enums.type";
import { Pageable } from "./Util";

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
  pageable: Pageable;
  size: number;
  number: number;
  last: boolean;
}

export interface ListFollowerParams {
  memberId: string;
  pageNo: number;
  pageSize: number;
}
export interface ListFollowerResponse {
  content: FollowContent[];
  pageable: Pageable;
  size: number;
  number: number;
  last: boolean;
}

export interface FollowState {
  following: FollowContent[];
  followed: FollowContent[];
}