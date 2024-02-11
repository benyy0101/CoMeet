import React, { useCallback, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import FollowerItem from "./FollowerItem";
import { searchFollower, searchFollowing } from "api/Follow";
import {
  FollowContent,
  ListFollowerParams,
  ListFollowerResponse,
  ListFollowingResponse,
} from "models/Follow.interface";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function FollowList(props: { option: string }) {
  const { option } = props;
  const [pageNo, setPageNo] = useState<number>(1);
  const [followingList, setFollowingList] = useState<FollowContent[]>([]);
  const [followerList, setFollowerList] = useState<FollowContent[]>([]);

  const memberId = useSelector((state: any) => state.user.user.memberId);

  const fetchData = useCallback(async () => {
    if (followerList.length === 0) {
      const res = await searchFollower({ memberId, pageNo, pageSize: 10 });
      setFollowerList((prev) => [...prev, ...res.content]);
    }

    if (followingList.length === 0) {
      const res2 = await searchFollowing({ memberId, pageNo, pageSize: 10 });
      setFollowingList((prev) => [...prev, ...res2.content]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Wrapper>
      {option === "follower" &&
        followerList.map((item, index) => (
          <FollowerItem
            key={item.memberId}
            item={item}
            option={option}
            option2={
              followingList.some((followItem) => followItem.memberId === item.memberId)
                ? true
                : false
            }
          />
        ))}
      {option === "following" &&
        followingList.map((item, index) => (
          <FollowerItem key={index} item={item} option={option} />
        ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-gradient-to-b
    from-cyan-950
    to-indigo-950
    rounded-md
    min-w-96
    h-full
    p-5
    text-black
    space-y-3
    overflow-hidden
`;
export default FollowList;
