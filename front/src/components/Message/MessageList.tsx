import { useQuery } from "@tanstack/react-query";
import { Pagination } from "components/Common/Pagination";
import { SearchNoteContent, SearchNoteParams } from "models/Note.interface";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { searchNote } from "api/Note";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ModalPortal from "utils/Portal";

interface MessageListProps {
  swapState: (state: string, no: number) => void;
}
function MessageList(params: MessageListProps) {
  const { swapState } = params;
  const [page, setPage] = React.useState<number>(1);
  const searchParams: SearchNoteParams = {
    page: page,
    size: 5,
  };

  const {
    data: messageList,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["messageList"],
    queryFn: () => searchNote(searchParams),
  });

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
    refetch();
  };

  const readNote = (no: number) => {
    swapState("read", no);
  };

  return (
    <Wrapper>
      <Header>
        <Title>쪽지함</Title>
        <Writable>
          <PencilSquareIcon className="h-6 w-6"></PencilSquareIcon>
        </Writable>
      </Header>

      <Content>
        <InfiniteScroll
          dataLength={messageList?.content.length || 0}
          next={fetchMoreData}
          hasMore={!isLoading && !error}
          loader={<h4>Loading...</h4>}
          className="space-y-5"
        >
          {messageList?.content.map((message) => (
            <>
              <MessageItem
                key={message.id}
                onClick={() => readNote(message.id)}
              >
                <MessageTitle>
                  <p className="text-blue-400">{message.writerId}</p>님의 쪽지
                </MessageTitle>
                {message.isRead ? (
                  <Status>읽음</Status>
                ) : (
                  <Status>안읽음</Status>
                )}
              </MessageItem>
            </>
          ))}
        </InfiniteScroll>
      </Content>
    </Wrapper>
  );
}

const Wrapper = tw.div`
h-96
min-w-96
bg-gradient-to-b
from-sky-950
to-indigo-950
rounded-md
p-10
px-5
text-indigo-50
flex
flex-col
space-y-5
`;

const Header = tw.div`
px-1
flex
justify-between
items-end
`;

const Writable = tw.button`
transition
hover:text-indigo-400
`;

const MessageItem = tw.button`
w-full
flex
justify-between
items-end
bg-white
bg-opacity-10
shadow-lg
rounded-md
p-3
`;

const MessageTitle = tw.div`
flex
space-x-3
`;
const Title = tw.div`
text-2xl
font-bold
`;

const Status = tw.div`
text-xs
text-gray-400
`;
const Content = tw.div`
w-full
h-full
rounded-md
bg-indigo-50
bg-opacity-10
p-4
overflow-y-auto
scrollbar-hide
`;
export default MessageList;
