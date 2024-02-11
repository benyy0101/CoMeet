import React, { ChangeEvent, useEffect, useState } from "react";
import { enterTil, createTil, modifyTil, deleteTil } from "api/Til";
import tw from "tailwind-styled-components";

import XIcon from "assets/img/x-icon.svg";

interface til {
  date: string;
  id: number;
}

type ModalProps = {
  toggleModal: () => void;
  refreshTils: () => void;
  activeDate: string;
  tilList: til[] | undefined;
};

function TilModal(props: ModalProps) {
  const [tilContent, setTilContent] = useState<string>();
  const [tilId, setTilId] = useState<number>();
  const message = `TIL을 작성해보세요!`;
  const [isTil, setIsTil] = useState<boolean>(false);
  const [isTilWrite, setIsTilWrite] = useState<boolean>(false);
  const [writeContent, setWriteContent] = useState<string>("");
  const [submitType, setSubmitType] = useState<string>("");

  const year = props.activeDate.split("-")[0];
  const month = props.activeDate.split("-")[1];
  const day = props.activeDate.split("-")[2];

  const handleToggleModal = () => {
    props.toggleModal();
  };

  const tilDate = async () => {
    if (props.tilList && props.tilList.length > 0) {
      const foundTil = props.tilList.find(
        (til) => til.date === props.activeDate
      );
      if (foundTil) {
        const res = await enterTil({ tilId: foundTil.id });
        setTilContent(res.context);
        setTilId(res.id);
        setIsTil(true);
      } else {
        setTilContent(message);
      }
    }
  };

  //글 작성
  const handleWriteTil = () => {
    setSubmitType("write");
    setIsTilWrite(true);
  };

  //글 작성할 때마다 실행
  const handleWrite = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setWriteContent(e.target.value);
  };

  //글 수정
  const handleModifyTil = () => {
    if (tilContent != null) {
      setWriteContent(tilContent);
    }
    setSubmitType("modify");
    setIsTilWrite(true);
  };

  //글 작성 / 수정 후
  const submitTil = async () => {
    //글작성
    if (submitType === "write") {
      if (writeContent !== "") {
        const res = await createTil({
          context: writeContent,
          date: props.activeDate,
        });

        if (typeof res === "number") {
          const content = await enterTil({ tilId: res });
          setTilContent(content.context);
          setTilId(content.id);
          setIsTil(true);
          setIsTilWrite(false);
        }
        props.refreshTils();
      } else {
        alert("글을 작성해주세요!");
      }

      //글수정
    } else if (submitType === "modify") {
      if (tilId !== undefined && writeContent !== "") {
        const res = await modifyTil({
          tilId: tilId,
          context: writeContent,
        });
        props.refreshTils();
        await tilDate();
        setIsTilWrite(false);
      } else {
        alert("글을 작성해주세요!");
      }
    }
  };

  //til 삭제
  const handleDelteTil = async () => {
    if (tilId !== undefined) {
      const res = await deleteTil({
        tilId: tilId,
      });
      props.refreshTils();
      props.toggleModal();
    }
  };

  useEffect(() => {
    tilDate();
  }, []);

  return (
    <Wrapper>
      <ModalContainer>
        <XButton onClick={handleToggleModal}>
          <XImg src={XIcon} alt="" />
        </XButton>
        <TilTitle>Today I Learned</TilTitle>
        <TilDate>
          {year}년 {month}월 {day}일
        </TilDate>
        {isTilWrite ? (
          <>
            <TilContentWrite
              wrap="hard"
              placeholder="오늘의 TIL은 무엇인가요?"
              onChange={handleWrite}
              value={writeContent}
            />
            <WriteOrModifyContainer>
              <WriteOrModify onClick={submitTil}>확인</WriteOrModify>
            </WriteOrModifyContainer>
          </>
        ) : (
          <>
            {isTil ? (
              <TilContent>{tilContent}</TilContent>
            ) : (
              <TilContentEmpty>{tilContent}</TilContentEmpty>
            )}
            <WriteOrModifyContainer>
              {isTil ? (
                <div>
                  <WriteOrModify onClick={handleModifyTil}>수정</WriteOrModify>
                  <Delete onClick={handleDelteTil}>삭제</Delete>
                </div>
              ) : (
                <WriteOrModify onClick={handleWriteTil}>작성</WriteOrModify>
              )}
            </WriteOrModifyContainer>
          </>
        )}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
`;

const XImg = tw.img`
w-6
h-6
`;

const XButton = tw.button`
w-6
rounded-lg
ml-auto
mr-3
hover:bg-gray-100
`;

const ModalContainer = tw.div`
  rounded-lg
  shadow-md
  w-[500px]
  h-[500px]
  bg-white
  flex
  flex-col
  pt-3
  pb-7

`;

const TilTitle = tw.div`
text-center
font-bold
text-3xl
text-[#A78DD9]
font-serif
border-b
pb-3
mx-10
`;

const TilDate = tw.div`
text-right
my-2
text-gray-500
text-sm mx-10
`;

const TilContent = tw.div`
border
flex-grow
p-2
break-words
mx-10
rounded-md
whitespace-pre-line
`;

const TilContentWrite = tw.textarea`
border
flex-grow
p-2
break-words
mx-10
rounded-md
`;

const TilContentEmpty = tw.div`
border
flex-grow
p-2
break-words
mx-10
rounded-md
text-gray-500
flex
flex-col
items-center
justify-center
`;

const WriteOrModifyContainer = tw.div`
flex
justify-end
mt-3
mx-10
`;

const WriteOrModify = tw.button`
whitespace-pre-line
py-2
px-2
text-white
text-sm
rounded-md
bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
`;

const Delete = tw.button`
ml-3
bg-gray-500
text-white
rounded-md
p-2
text-sm
`;

export default TilModal;
