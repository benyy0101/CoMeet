import {
  FollowParams,
  FollowResponse,
  ListFollowerParams,
  ListFollowerResponse,
  ListFollowingParams,
  ListFollowingResponse,
  UnfollowParams,
  UnfollowResponse,
} from "models/Follow.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const follow = async (params: FollowParams): Promise<FollowResponse> => {
  const url = `member/follow`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const unfollow = async (
  params: UnfollowParams
): Promise<UnfollowResponse> => {
  const url = `member/follow`;
  const response = await localAxios.delete(url, { data: params });
  return response.data;
};

export const searchFollower = async (
  params: ListFollowerParams
): Promise<ListFollowerResponse> => {
  const { memberId, pageNo, pageSize } = params;
  const url = `member/follower/${memberId}${makeQuerystring({ pageNo, pageSize })}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const searchFollowing = async (
  params: ListFollowingParams
): Promise<ListFollowingResponse> => {
  const { memberId, pageNo, pageSize } = params;
  const url = `member/following/${memberId}${makeQuerystring({ pageNo, pageSize })}`;
  const response = await localAxios.get(url);
  return response.data;
};
