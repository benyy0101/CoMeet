import React from "react";

import tw from "tailwind-styled-components";

const NoticeContainer = tw.div`
bg-[#161616]
text-white
absolute
mt-1
py-2
shadow-lg
z-50
rounded-md
px-2
w-[20%]

`;

const Title = tw.h1`
text-center
font-bold
p-2
border-b
`;

const Contents = tw.p`
p-2
`;

interface IProps {
  text: string | undefined;
}

export const RoomNotice = ({ text }: IProps) => {
  return (
    <NoticeContainer>
      {text ? (
        <>
          <Title>공지</Title>
          <Contents>{text}</Contents>
        </>
      ) : (
        <Title>공지가 없습니다.</Title>
      )}
    </NoticeContainer>
  );
};
