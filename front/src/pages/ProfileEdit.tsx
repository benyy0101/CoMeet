import { Background } from "components/Common/Backgruond";
import EditForm from "components/ProfileEdit/EditForm";
import React from "react";
import tw from "tailwind-styled-components";

function ProfileEdit() {
  return (
    <Wrapper>
      <Background />
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

items-center
relative

pt-5
`;

const Title = tw.div`

mb-5
text-white
text-xl
font-bold
`;
export default ProfileEdit;
