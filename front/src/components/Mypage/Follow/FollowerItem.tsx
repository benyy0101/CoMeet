import { follow, unfollow } from "api/Follow";
import { FollowContent } from "models/Follow.interface";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

interface FollowerItemProps {
  item: FollowContent;
  option: string;
  option2?: boolean;
}

const FollowerItem = (props: FollowerItemProps) => {
  const { item, option, option2 } = props;
  const [isFollowing, setIsFollowing] = useState<boolean>(option2 === false ? true : false);
  const isInitialRender = useRef(true);

  const unfollowHandler = async (id:string) => {
    try{
      const res = await unfollow({memberId: id});
    }
    catch(e){
      console.log(e);
    }
  }

  const followHandler = async (id:string) => {
    try{
      const res = await follow({memberId: id});
    }
    catch(e){
      console.log(e);
    }
  }

  const isFollowingHandler = () => {
    setIsFollowing(!isFollowing);
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if(isFollowing){
      unfollowHandler(item.memberId);
    }
    else if (isFollowing === false){
      followHandler(item.memberId);
    }
  },[isFollowing]);

  return (
    <Wrapper>
      <LeftContainer>
        <ProfileImage src={item.profileImage} />
        <ProfileName>{item.nickname}</ProfileName>
      </LeftContainer>
      {option === "follower" && option2 === false && isFollowing && (
        <RightContainer>
          <FollowButton onClick={isFollowingHandler}>팔로우</FollowButton>
        </RightContainer>
      )}
      {option === "follower" && option2 === false  && !isFollowing && (
        <RightContainer>
          <FollowButton onClick={isFollowingHandler}>언팔로우</FollowButton>
        </RightContainer>
      )}

      {option === "following"  && !isFollowing && (
        <RightContainer>
          <FollowButton onClick={isFollowingHandler}>언팔로우</FollowButton>
        </RightContainer>
      )}

      {option === "following"  && isFollowing && (
        <RightContainer>
          <FollowButton onClick={isFollowingHandler}>팔로우</FollowButton>
        </RightContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex
    items-center
    justify-between
    w-full
    h-12
    bg-white
    bg-opacity-10
    p-5
    px-2
    text-black
    rounded-md
    shadow-lg
    text-white
`;

const LeftContainer = tw.div`
    flex
    items-center
`;

const ProfileImage = tw.img`
    w-8
    h-8
    rounded-full
`;

const ProfileName = tw.div`
    ml-5
    text-lg
`;

const RightContainer = tw.div`
    flex
    items-center
    ml-auto
`;

const FollowButton = tw.button`s
    text-indigo-200
    w-20
    h-10
    rounded-md
    text-sm
`;

export default FollowerItem;
