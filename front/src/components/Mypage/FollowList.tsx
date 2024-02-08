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
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [list, setList] = useState<FollowContent[]>([]);
  const memberId = useSelector((state: any) => state.user.user.memberId);

  const fetchData = useCallback(async () => {
    let res: ListFollowerResponse | ListFollowingResponse;
    if (option === "follower") {
      res = await searchFollower({ memberId, pageNo, pageSize: 10 });
    } else {
      res = await searchFollowing({ memberId, pageNo, pageSize: 10 });
    }
    setList((prev) => [...prev, ...res.content]);
    setPageNo((prev) => prev + 1);
    setHasNext(!res.last);
    setIsFetching(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setIsFetching(true);
      }
    };
    setIsFetching(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNext) fetchData();
    else if (!hasNext) setIsFetching(false);
  }, [isFetching]);

  //fetchData();

  return (
    <Wrapper>
      {list.map((item, index) => (
        <FollowerItem key={index} item={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-gray-300
    rounded-md
    w-full
    h-full
    p-5
    text-black
    space-y-3
    overflow-hidden
`;
export default FollowList;
