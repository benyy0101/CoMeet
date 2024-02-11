import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import RoomDefault from "assets/img/room-default.svg";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { XCircleIcon } from "@heroicons/react/24/outline";

export const ServerDropDownList = () => {
  const currentRoomId = useSelector((state: any) => state.room.roomId);
  const roomInfo = useSelector((state: any) => state.user.user.joinedRooms);

  return (
    <StyleDropdownMenu>
      <StyleDropdownTitleContainer>
        <StyleDropdownTitle>가입한 방 목록</StyleDropdownTitle>
        <Link to="/room-regist">
          <AddButton>+ 방 만들기</AddButton>
        </Link>
      </StyleDropdownTitleContainer>
      {roomInfo.length > 0 ? (
        <ServerContent>
          {roomInfo.map((room: any) => (
            <Link to={`/room/${room.roomId}`} replace>
              <StyleImgTextBoth
                key={room.roomId}
                $disabled={room.roomId === +currentRoomId}
              >
                <StyleServerImg src={RoomDefault} alt="" />
                <StyleServerText>{room.title}</StyleServerText>
                <StyleServerDot $visible={room.roomId === +currentRoomId} />
              </StyleImgTextBoth>
            </Link>
          ))}
        </ServerContent>
      ) : (
        <ServerContent>
          <NoneTextContainer>
            <CustomXCircleIcon />
            <NoneText>가입한 지속 스터디 방을 찾을 수 없습니다.</NoneText>
          </NoneTextContainer>
        </ServerContent>
      )}
    </StyleDropdownMenu>
  );
};

//StyleDropdownMenu: 서버의 드롭다운 메뉴 스타일
// 너비(w)와 오른쪽(right)의 절대적인 숫자를 바꿔야 함
const StyleDropdownMenu = tw.div`
w-72
flex
flex-col
items-center
justify-center
p-2
shadow-2xl
absolute
bg-gray-700
text-slate-200
text-sm
top-11
left-0
-translate-x-1/2
rounded-lg
`;

const StyleDropdownTitleContainer = tw.div`
w-full
px-2
mb-2
flex
justify-between
items-center
`;

//StyleServerTitle: '가입한 내 방' 과 같은 타이틀
const StyleDropdownTitle = tw.h1`
font-semibold
text-lg
text-slate-100
`;

const AddButton = tw.button`
font-light
text-slate-300
text-xs
`;

//StyleImgTextBoth: '서버 이미지, 서버 이름'
const StyleImgTextBoth = tw.div<{ $disabled: boolean }>`
flex
items-center
space-x-2
p-2
${(p) => (p.$disabled ? "bg-black bg-opacity-10 rounded-md" : "hover:bg-black hover:rounded-md hover:bg-opacity-10")}
transition-all
`;

const ServerContent = tw.div`
w-full
`;
//StyleServerImg: 서버 이미지
const StyleServerImg = tw.img`
bg-white
rounded-full
w-7
mr-2
ml-1
`;

const StyleServerText = tw.div`
w-full
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
`;

const StyleServerDot = tw.div<{ $visible: boolean }>`
w-1.5
h-1.5
min-w-1.5
min-h-1.5
${(p) => (p.$visible ? "bg-green-400" : "bg-transparent")}
rounded-full
`;

const NoneTextContainer = tw.div`
w-full
flex
flex-col
h-24
space-y-1
justify-center
items-center
`;

const CustomXCircleIcon = tw(XCircleIcon)`
w-6
h-6
text-slate-400
m-1
`;

const NoneText = tw.p`
text-slate-400
font-light
text-sm
text-center
`;
