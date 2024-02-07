import React, { useEffect } from "react";
import tw from "tailwind-styled-components";

type RoomOptionProps = {
  provoke: boolean;
  selectRoom: (room: string) => void;
};

type Room = {
  id: number;
  name: string;
  isActive: boolean;
};

type RoomButtonProps = {
  selected: boolean;
  active: boolean;
};
function RoomOption(props: RoomOptionProps) {
  const [roomList, setRoomList] = React.useState<Room[]>([
    { id: 1, name: "SSAFY 9기", isActive: true },
    { id: 2, name: "SSAFY 10기", isActive: false },
    { id: 3, name: "SSAFY 11기", isActive: true },
    { id: 4, name: "SSAFY 12기", isActive: true },
    { id: 5, name: "SSAFY 13기", isActive: true },
  ]);
  const [selected, setSelected] = React.useState<string>("");

  const selectedHandler = (room: Room) => {
    if (room.isActive === false) return;
    setSelected(room.name);
    props.selectRoom(room.name);
  };

  useEffect(() => {
    // 가능한 방 fetch 해오기
    if (props.provoke) {
      console.log("provoke");
    }
  }, [props.provoke]);

  return (
    <Wrapper>
      {roomList ? (
        roomList.map((room) => (
          <RoomButton
            key={room.id}
            onClick={() => selectedHandler(room)}
            selected={selected === room.name}
            active={room.isActive}
          >
            {room.name}
          </RoomButton>
        ))
      ) : (
        <div>방이 없습니다.</div>
      )}
    </Wrapper>
  );
}

const Wrapper = tw.div`
    flex
    self-start
    rounded-md
    bg-purple-100
    bg-opacity-10

`;

const RoomButton = tw.button<RoomButtonProps>`
  text-purple-400
  rounded-xl
  px-2
  m-2
  ${(props) => (props.selected && props.active ? "text-purple-700" : "")} 
  ${(props) => (props.active ? "" : "text-red-900 opacity-40 cursor-not-allowed disabled")}
`;

export default RoomOption;
