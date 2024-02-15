import tw from "tailwind-styled-components";
import Chat from "./Chat";
import ShareEditor from "./ShareEditor";
import UserVideoComponent from "./UserVideoComponent";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import {
  ChatBubbleBottomCenterIcon as ChatOutlineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon as ChatSolidIcon } from "@heroicons/react/24/solid";

interface IProps {
  profileImg: string;
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

const sidePageSize = 2;

export default function Channel({
  profileImg,
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
  const [chatOpen, setChatOpen] = useState<boolean>(true);
  const [sideOpen, setSideOpen] = useState<boolean>(true);
  const [inChat, setInChat] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6);

  useEffect(() => {
    setPageSize(mainStreamManager ? 2 : chatOpen ? 6 : 8);
  }, [chatOpen, mainStreamManager]);

  useEffect(() => {
    setPage(0);
  }, [mainStreamManager]);

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
              {mainStreamManager !== null && (
                <ChannelHeaderButton
                  onClick={() => {
                    handleMainVideoStream(null);
                    if (!chatOpen) {
                      setSideOpen(false);
                    }
                  }}
                >
                  <Squares2X2Icon className="w-6 h-6" />
                </ChannelHeaderButton>
              )}
              <ChannelHeaderButton
                onClick={() => {
                  setChatOpen(!chatOpen);
                  if (mainStreamManager == null) {
                    setSideOpen(!sideOpen);
                  }
                }}
              >
                {chatOpen ? (
                  <ChatSolidIcon className="w-6 h-6" />
                ) : (
                  <ChatOutlineIcon className="w-6 h-6" />
                )}
              </ChannelHeaderButton>
              <ChannelHeaderButton onClick={leaveSession}>
                <XMarkIcon className="w-6 h-6" />
              </ChannelHeaderButton>
            </ChannelHeaderButtonContainer>
          </ChannelHeader>
          <Divider></Divider>
        </>
      )}
      <VideoContainer>
        {session !== undefined && sideOpen && (
          <SideContainer>
            {chatOpen ? (
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
            ) : (
              <SideVideoContainer>
                {publisher &&
                  [publisher, ...subscribers]
                    .filter((sub) => sub !== mainStreamManager)
                    .slice(page * sidePageSize, (page + 1) * sidePageSize)
                    .map((sub, i) => (
                      <StreamContainer key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                        <UserVideoComponent
                          streamManager={sub}
                          speaking={speakerIds.includes(sub.stream.connection.connectionId)}
                          isMain={false}
                        />
                      </StreamContainer>
                    ))}
                {page > 0 && (
                  <SidePaginationButton
                    className="top-2"
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    <UpIcon />
                  </SidePaginationButton>
                )}
                {subscribers.length > (page + 1) * pageSize && (
                  <SidePaginationButton
                    className="bottom-2"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    <DownIcon />
                  </SidePaginationButton>
                )}
              </SideVideoContainer>
            )}
          </SideContainer>
        )}
        {/* 클릭시 나오는 확대 영상 */}

        {/* {mainStreamManager !== undefined ? (
        <div id="main-video" className="col-md-6">
          <UserVideoComponent streamManager={mainStreamManager} />
        </div>
      ) : null} */}
        {mainStreamManager !== null ? (
          <DetailContainer>
            <MainStreamContainer>
              <UserVideoComponent
                streamManager={mainStreamManager}
                speaking={false}
                isMain={true}
              />
            </MainStreamContainer>
          </DetailContainer>
        ) : (
          <GridContainer>
            <ViedoGrid $chatOpen={chatOpen}>
              {publisher &&
                [publisher, ...subscribers]
                  .slice(page * pageSize, (page + 1) * pageSize)
                  .map((sub, i) => (
                    <StreamContainer
                      key={sub.stream.connection.connectionId}
                      onClick={() => {
                        handleMainVideoStream(sub);
                        setSideOpen(true);
                      }}
                    >
                      <UserVideoComponent
                        streamManager={sub}
                        speaking={speakerIds.includes(sub.stream.connection.connectionId)}
                        isMain={false}
                      />
                    </StreamContainer>
                  ))}
            </ViedoGrid>
            {page > 0 && (
              <PaginationButton className="left-1" onClick={() => setPage((prev) => prev - 1)}>
                <LeftIcon />
              </PaginationButton>
            )}
            {subscribers.length + 1 > (page + 1) * pageSize && (
              <PaginationButton className="right-1" onClick={() => setPage((prev) => prev + 1)}>
                <RightIcon />
              </PaginationButton>
            )}
          </GridContainer>
        )}
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
flex
space-x-4
px-2
`;

const ChannelHeaderButton = tw.div`
w-10
h-10
flex
justify-center
items-center
rounded-full
cursor-pointer
text-slate-300
`;

const VideoContainer = tw.div`
w-full
h-full
flex
flex-row-reverse
`;

const GridContainer = tw.div`
w-full
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
cursor-pointer
`;

const LeftIcon = tw(ChevronLeftIcon)`
text-slate-400
hover:text-slate-200
w-8
h-8
`;

const RightIcon = tw(ChevronRightIcon)`
text-slate-400
hover:text-slate-200
w-8
h-8
`;

const UpIcon = tw(ChevronUpIcon)`
text-slate-400
hover:text-slate-200
w-8
h-8
`;

const DownIcon = tw(ChevronDownIcon)`
text-slate-400
hover:text-slate-200
w-8
h-8
`;

const ViedoGrid = tw.div<{ $chatOpen: boolean }>`
text-white
grid
${(p) => (p.$chatOpen ? "grid-cols-3" : "grid-cols-4")}
gap-4
p-6
`;

const StreamContainer = tw.div`
flex
justify-center
items-center
`;

const SideContainer = tw.div`
w-0
xl:min-w-96
h-full
overflow-hidden
`;

const ChatContainer = tw.div`
w-full
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

const DetailContainer = tw.div`
flex
h-full
flex-grow-[1]
flex-col
relative
p-4
`;

const MainStreamContainer = tw.div`
w-full
h-full
`;

const SideVideoContainer = tw.div`
w-full
h-full
flex
flex-col
justify-center
space-y-2
p-2
relative
`;

const SidePaginationButton = tw.div`
absolute
left-1/2
-translate-x-1/2
cursor-pointer
`;
