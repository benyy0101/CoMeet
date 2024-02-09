import { follow } from "api/Follow";
import { FollowContent } from "models/Follow.interface";
import React from "react";
import tw from "tailwind-styled-components";

interface FollowerItemProps {
  item: FollowContent;
  option: string;
}

const FollowerItem: React.FC<FollowerItemProps> = ({ item,option }) => {
  return (
    <Wrapper>
      <LeftContainer>
        <ProfileImage src={item.profileImage} />
        <ProfileName>{item.nickname}</ProfileName>
      </LeftContainer>
      <RightContainer>
        <FollowButton>팔로우</FollowButton>
      </RightContainer>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    flex
    items-center
    justify-between
    w-96
    h-12
    bg-black
    bg-opacity-20
    p-5
    text-black
    rounded-md
    shadow-md
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
    text-purple-500
    w-20
    h-10
    rounded-md
`;

export default FollowerItem;
