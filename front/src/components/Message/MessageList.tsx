import { useQuery } from "@tanstack/react-query";
import { Pagination } from "components/Common/Pagination";
import { SearchNoteContent, SearchNoteParams, SearchNoteResponse } from "models/Note.interface";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { deleteNote, searchNote } from "api/Note";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ModalPortal from "utils/Portal";
import { useDispatch } from "react-redux";
import { decNoteNumber } from "store/reducers/userSlice";
import { set } from "react-hook-form";

interface MessageListProps {
  swapState: (state: string, no: number) => void;
}
function MessageList(params: MessageListProps) {
  const { swapState } = params;
  const dispatch = useDispatch();
  const [noteList, setNoteList] = useState<SearchNoteContent[]>([]);
  // const [newNoteList, setNewNoteList] = useState<SearchNoteContent[]>([]);
  const [searchNoteParams, setSearchNoteParams] = useState<SearchNoteParams>({
    page: 0,
    size: 20,
  });

  //무한스크롤 구현
  const pagesize = 20;
  //이 친구로 페이지가 바뀌었는지 판단함
  const numberOfElements = useRef<number>(0);

  const searchMessage = () => {
    searchNote(searchNoteParams)
      .then((data) => {
        setNoteList((prev) => {
          return prev.concat(
            data.content.filter((each) => (prev.find((dat) => dat.id === each.id) ? false : true))
          );
        });
        numberOfElements.current = data.numberOfElements;
      })
      .catch((f) => {
        console.log("fail", f.response);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("note-list-observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      if (numberOfElements.current === pagesize) {
        searchNoteParams.page++;
      }
      setSearchNoteParams(searchNoteParams);
      searchMessage();
    }
  };

  const readNote = (no: number) => {
    swapState("read", no);
  };

  const writeNote = () => {
    swapState("write", 0);
  };

  const deleteNoteHandler = async (no: number) => {
    try {
      await deleteNote({ noteId: no });
      setNoteList((prevMessages) => {
        if (!prevMessages) {
          return prevMessages;
        }

        const newContent = prevMessages?.filter((message) => message.id !== no) || [];
        return newContent;
        // return { ...prevMessages, content: newContent };
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>쪽지함</Title>
        <Writable
          onClick={() => {
            writeNote();
          }}
        >
          <PencilSquareIcon className="h-6 w-6"></PencilSquareIcon>
        </Writable>
      </Header>

      <Content>
        {noteList.map((message) => (
          <>
            <MessageItem key={message.id}>
              <MessageTitle
                onClick={() => {
                  readNote(message.id);
                  if (!message.isRead) {
                    dispatch(decNoteNumber());
                  }
                }}
              >
                <p className="text-blue-400">{message.writerId}</p>님의 쪽지
              </MessageTitle>
              <RightBox>
                {message.isRead ? <Status>읽음</Status> : <Status>안읽음</Status>}
                <TrashCan onClick={() => deleteNoteHandler(message.id)}>
                  <TrashIcon className="w-6 h-6"></TrashIcon>
                </TrashCan>
              </RightBox>
            </MessageItem>
          </>
        ))}
        <div id="note-list-observer" style={{ height: "10px" }}>
          dd
        </div>
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

const MessageItem = tw.div`
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

const RightBox = tw.div`
flex
space-x-2
justify-center
items-center
`;

const MessageTitle = tw.button`
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

const TrashCan = tw.button`
transition
hover:text-red-500
`;
const Content = tw.div`
w-full
h-full
rounded-md
bg-indigo-50
bg-opacity-10
p-4
overflow-y-auto
space-y-3
`;
export default MessageList;
