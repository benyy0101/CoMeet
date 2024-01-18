import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import tw from "tailwind-styled-components";
const InputItem = tw.div`
    text-base
    flex
    gap-3
`;

const Submit = tw.button`
    border-2
    px-2
`;

const Wrapper = tw.section`
    h-screen
    flex
    flex-col
    justify-center
    items-center
    gap-5
`;

const Form = tw.form`
flex
flex-col
gap-3
p-4
rounded-md
shadow-lg
`;

const Input = tw.input`
    border-b
`;
type Inputs = {
  title: string;
  description: string;
  capacity: number;
  constraints: string;
  type: string;
};

enum RoomType {
  DISPOSABLE,
  PERMANENT,
}

enum ConstraintType {
  VIDEOONMICOFF,
  VIDEOON,
  MICOFF,
  FREE,
}

function FormContainer() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <div className="text-xl">방 생성</div>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <InputItem>
          <label>방 제목</label>
          <Input
            {...(register("title"),
            { required: true, minLength: 2, maxLength: 30 })}
          />
        </InputItem>
        <InputItem>
          <label>한 줄 설명</label>
          <Input
            {...(register("description"), { required: true, maxLength: 140 })}
          />
        </InputItem>
        <InputItem>
          <label>최대 인원 수</label>
          <Input {...register("capacity")} type="number" />
        </InputItem>
        <InputItem>
          <label>방 설정</label>
          <Input {...register("constraints")} />
        </InputItem>
        <Submit>Submit</Submit>
      </Form>
    </Wrapper>
  );
}

export default FormContainer;
