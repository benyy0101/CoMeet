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
      {option === "follower" && (<Title>팔로워</Title>)}
      {option === "following" && (<Title>팔로잉</Title>)}
      <ItemContainer>
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
      </ItemContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
h-96
min-w-96
bg-gradient-to-b
from-sky-950
to-indigo-950
rounded-md
p-5
text-indigo-50
flex
flex-col
space-y-5
`;

const Title = tw.div`
text-3xl
text-bold
text-sky-100
`

const ItemContainer = tw.div`
w-full
flex
flex-col
space-y-5
bg-white
bg-opacity-10
p-3
rounded-md
max-h-96
overflow-scroll
scrollbar-hide
`
export default FollowList;
