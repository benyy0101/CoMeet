import { NavBar } from "components/Common/NavBar";
import EditForm from "components/ProfileEdit/EditForm";
import React from "react";
import tw from "tailwind-styled-components";

function ProfileEdit() {
  return (
    <Wrapper>
      <Title>회원정보 수정</Title>
      <EditForm />
    </Wrapper>
  );
}

const Wrapper = tw.div`
w-full
h-[calc(100vh-48px)]
flex
flex-col
justify-center
items-center
relative
bg-gradient-to-b
from-[#0A031C]
from-80%
to-[#100530]
space-y-4
`;

const Title = tw.div`
w-1/2
text-[#FDFD96]
text-3xl
font-bold
`;
export default ProfileEdit;
