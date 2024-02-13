import { useQuery } from "@tanstack/react-query";
import { searchManagingRoom } from "api/Room";
import { SearchManagingResponses } from "models/Room.interface";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

type RoomOptionProps = {
  editRoom?: string;
  selectRoom: (room: number) => void;
};

type RoomButtonProps = {
  selected: boolean;
  active: boolean;
};
function RoomOption(props: RoomOptionProps) {
  const {selectRoom, editRoom} = props;

  const dummy = [{ roomId: 42, title: "SSAFY 9기", full: true }];
  const [roomList, setRoomList] = useState<SearchManagingResponses[]>(dummy);

  const { data: ManagedRoomData,refetch } = useQuery<SearchManagingResponses[], Error>({
    queryKey: ["managedRoomData"],
    queryFn: () => searchManagingRoom({}),
  });

  useEffect(()=>{
    refetch();
  },[]);

  useEffect(() => {
    setRoomList(ManagedRoomData!);
  }, [ManagedRoomData]);

  const [selected, setSelected] = React.useState<number>(0);

  const selectedHandler = (room: SearchManagingResponses) => {
    if (room.full) return;
    setSelected(room.roomId);
    props.selectRoom(room.roomId);
  };
  return (
    <Wrapper>
      {roomList && editRoom?.length === 0 && (
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
      )}
      {
        roomList && editRoom?.length !== 0 && (
          roomList.map((room) => (
            <RoomButton
              key={room.roomId}
              onClick={() => selectedHandler(room)}
              selected={selected === room.roomId}
              active={room.title === editRoom}
            >
              {room.title}
            </RoomButton>
          ))
        )

      }
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
