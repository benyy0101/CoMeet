import tw from "tailwind-styled-components";
import Chat from "./Chat";
import ShareEditor from "./ShareEditor";
import UserVideoComponent from "./UserVideoComponent";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

interface IProps {
  session: any;
  mySessionName: string;
  mySessionId: string;
  myUserName: string;
  publisher: any;
  subscribers: any[];
  speakerIds: string[];
  leaveSession: () => void;
  mainStreamManager: any;
  handleMainVideoStream: (sub: any) => void;
}

export default function Channel({
  session,
  mySessionName,
  mySessionId,
  myUserName,
  publisher,
  subscribers,
  speakerIds,
  leaveSession,
  mainStreamManager,
  handleMainVideoStream,
}: IProps) {
  const [inChat, setInChat] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const editorRef = useRef<any>(null);
  return (
    <ChannelContent>
      {session !== undefined && (
        <>
          <ChannelHeader>
            <ChannelTitle>
              <UserGroupIcon className="text-white w-8 h-8 mr-3" />
              {mySessionName}
            </ChannelTitle>
            <ChannelHeaderButtonContainer>
              <ChannelHeaderButton onClick={leaveSession}>
                <XMarkIcon className="text-red-900 w-6 h-6" />
              </ChannelHeaderButton>
            </ChannelHeaderButtonContainer>
          </ChannelHeader>
          <Divider></Divider>
        </>
      )}
      <VideoContainer>
        {session !== undefined && (
          <ChatContainer>
            <ChatNavbar>
              <ChatNavButton
                key={"chat"}
                disabled={inChat === true}
                onClick={() => setInChat(true)}
              >
                채팅
              </ChatNavButton>
              <ChatNavButton
                key={"share-editor"}
                disabled={inChat === false}
                onClick={() => setInChat(false)}
              >
                공유코드
              </ChatNavButton>
            </ChatNavbar>
            {inChat ? (
              <Chat
                chatDomain={"channel"}
                id={mySessionId}
                username={myUserName}
                setMessage={setMessage}
                message={message}
              />
            ) : (
              <ShareEditor
                session={session}
                username={myUserName}
                setMessage={setMessage}
                setInChat={setInChat}
                editorRef={editorRef}
              />
            )}
          </ChatContainer>
        )}
        {/* 클릭시 나오는 확대 영상 */}
        {/* {mainStreamManager !== undefined ? (
        <div id="main-video" className="col-md-6">
          <UserVideoComponent streamManager={mainStreamManager} />
        </div>
      ) : null} */}
        <GridContainer>
          <ViedoGrid>
            {/* {publisher !== undefined && (
            <StreamContainer key={publisher.id} onClick={() => handleMainVideoStream(publisher)}>
            <UserVideoComponent
            streamManager={publisher}
            speaking={speakerIds.includes(publisher.stream.connection.connectionId)}
            />
            </StreamContainer>
          )} */}
            {[publisher, ...subscribers].slice(page * 6, (page + 1) * 6).map((sub, i) => (
              <StreamContainer key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                <UserVideoComponent
                  streamManager={sub}
                  speaking={speakerIds.includes(sub.stream.connection.connectionId)}
                />
              </StreamContainer>
            ))}
          </ViedoGrid>
          {page > 0 && (
            <PaginationButton className="left-1" onClick={() => setPage((prev) => prev - 1)}>
              <ChevronLeftIcon className="text-white w-8 h-8" />
            </PaginationButton>
          )}
          {subscribers.length + 1 > (page + 1) * 6 && (
            <PaginationButton className="right-1" onClick={() => setPage((prev) => prev + 1)}>
              <ChevronRightIcon className="text-white w-8 h-8" />
            </PaginationButton>
          )}
        </GridContainer>
      </VideoContainer>
    </ChannelContent>
  );
}

const ChannelContent = tw.div`
w-full
h-full
bg-[#282828]
rounded-md
flex
flex-col
self-end
`;

const ChannelHeader = tw.div`
w-full
h-16
flex
items-center
px-4
justify-between
`;

const ChannelTitle = tw.h1`
text-slate-100
text-xl
flex
items-end
`;

const Divider = tw.div`
h-[1px]
w-[95%]
bg-gradient-to-r
self-center
via-[#4b5082]
from-[#c5c7bd]
to-[#972da0]
`;

const ChannelHeaderButtonContainer = tw.div`
`;

const ChannelHeaderButton = tw.div`
w-7
h-7
flex
justify-center
items-center
bg-red-100
rounded-full
cursor-pointer
`;

const VideoContainer = tw.div`
w-full
h-full
flex
flex-row-reverse
`;

const GridContainer = tw.div`
flex
items-center
pb-4
px-4
relative
`;

const PaginationButton = tw.div`
absolute
top-1/2
-translate-y-full
`;

const ViedoGrid = tw.div`
text-white
grid
grid-cols-3
gap-4
p-6
`;

const StreamContainer = tw.div`
flex
justify-center
items-center
`;

const ChatContainer = tw.div`
w-0
xl:min-w-96
h-full
rounded-lg
flex
flex-col
justify-between
items-center
bg-[#333333]
overflow-hidden
`;

const ChatNavbar = tw.div`
w-full
h-10
min-h-10
bg-gray-900
`;

const ChatNavButton = tw.button`
w-1/2
h-full
bg-slate-50/5
text-slate-500
disabled:bg-transparent
disabled:text-slate-200
`;
