import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import tw from "tailwind-styled-components";

interface IChannelItem {
  name: string;
  idx: number;
  remove: (id: number) => void;
}

function ChannelItem(props: IChannelItem) {
  const { name, idx, remove } = props;
  const removeHandler = () => {
    remove(idx);
  };
  return (
    <Wrapper>
      <Title>{name}</Title>
      <RightContainer>
        <Destroy onClick={removeHandler}>
          <CustomTrashIcon />
        </Destroy>
      </RightContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
border-slate-500
border
w-96
h-full
p-3
rounded-md
flex
justify-between
`;

const Title = tw.div`
w-80
max-w-80
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
`;

const RightContainer = tw.div`
flex
gap-4
`;

const Destroy = tw.button`
text-lg
`;

const CustomTrashIcon = tw(TrashIcon)`
text-red-500
opacity-50
hover:opacity-100
w-6
h-6
`;

export default ChannelItem;
