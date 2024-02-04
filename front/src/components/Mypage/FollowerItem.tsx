import React from "react";
import tw from "tailwind-styled-components";

interface FollowItemProps {
  name: string;
  profile: string;
}

function FollowerItem(props: FollowItemProps) {
  const { name, profile } = props;
  return (
    <Wrapper>
      <LeftContainer>
        <ProfileImage src={profile} />
        <ProfileName>{name}</ProfileName>
      </LeftContainer>
      <RightContainer>
        <FollowButton>팔로우</FollowButton>
      </RightContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    flex
    items-center
    justify-between
    w-96
    h-20
    bg-slate-500
    bg-opacity-20
    p-5
    text-black
    rounded-md
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

const FollowButton = tw.button`
    bg-slate-500
    text-white
    w-20
    h-10
    rounded-md
`;

export default FollowerItem;
