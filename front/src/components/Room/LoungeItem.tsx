import React from "react";
import tw from "tailwind-styled-components";

function LoungeItem() {
  return (
    <Wrapper>
      <LeftContainer>
        <Thumbnail />
        <Title>메인라운지</Title>
      </LeftContainer>
      <RightContainer>
        <Destroy>채널 삭제</Destroy>
      </RightContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-slate-500
    w-96
    min-h-10
    h-full
    p-4
    rounded-md
    flex
    justify-between
`;
const LeftContainer = tw.div`
    flex
    gap-4
`;

const Thumbnail = tw.div`
    w-8
    h-8
    bg-gray-300
    rounded-full
`;

const Title = tw.div`
    flex
    items-center
    gap-2
`;

const RightContainer = tw.div`
    flex
    gap-4
`;

const Destroy = tw.button`
`;

export default LoungeItem;
