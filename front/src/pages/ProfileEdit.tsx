import { NavBar } from "components/Common/Navigation/NavBar";
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
`;

const Title = tw.div`
text-[#FDFD96]
`;
export default ProfileEdit;
