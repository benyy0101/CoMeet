import React from "react";
import TextEditor from "../components/BoardWrite/TextEditor";
import tw from "tailwind-styled-components";

type BoardProps = {
  isFree: boolean;
  isEdit: boolean;
};

function Board(props: BoardProps) {
  const { isFree, isEdit } = props;
  const [edit, setEdit] = React.useState<boolean>(isEdit);

  return (
    <Wrapper>
      <TextEditor isFree={isFree} isEdit={edit} />
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex
  flex-col
  bg-gradient-to-b
  min-h-screen
  from-[#050110]
  from-10%
  to-[#1E0329]
  justify-center
  items-center
`;

export default Board;
