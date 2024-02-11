import { useQuery } from "@tanstack/react-query";
import { searchManagingRoom } from "api/Room";
import { SearchManagingResponses } from "models/Room.interface";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

type RoomOptionProps = {
  provoke: boolean;
  selectRoom: (room: number) => void;
};

type RoomButtonProps = {
  selected: boolean;
  active: boolean;
};
function RoomOption(props: RoomOptionProps) {
  const dummy = [{ roomId: 42, title: "SSAFY 9기", full: true }];
  const [roomList, setRoomList] = useState<SearchManagingResponses[]>(dummy);

  const { data: ManagedRoomData } = useQuery<SearchManagingResponses[], Error>({
    queryKey: ["managedRoomData"],
    queryFn: () => searchManagingRoom({}),
  });

  useEffect(() => {
    setRoomList(ManagedRoomData!);
  }, [ManagedRoomData]);

  const [selected, setSelected] = React.useState<number>(0);

  const selectedHandler = (room: SearchManagingResponses) => {
    if (room.full) return;
    setSelected(room.roomId);
    props.selectRoom(room.roomId);
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
            key={room.roomId}
            onClick={() => selectedHandler(room)}
            selected={selected === room.roomId}
            active={!room.full}
          >
            {room.title}
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
