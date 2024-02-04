import React from "react";
import tw from "tailwind-styled-components";

function EditForm() {
  return (
    <Wrapper>
      <Form>
        <FormRightContainer>
          <Label>이름</Label>
          <Input type="text"></Input>
        </FormRightContainer>
        <FormLeftContainer></FormLeftContainer>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
border
border-white
rounded-md
w-full
h-full
`;

const Form = tw.form`
    flex
`;

const FormRightContainer = tw.div``;

const FormLeftContainer = tw.div``;

const Label = tw.label`
text-white
`;

const Input = tw.input`
bg-transparent
focus:border-none
`;
export default EditForm;
