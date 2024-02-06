import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import RoomItem from "../components/RoomItem";
import Search from "../assets/img/search.svg";
import FilterImg from "../assets/img/filter.png";
import FilterMenu from "../components/FilterMenu";
import { RoomItemProps } from "../types";
import { useQuery } from "@tanstack/react-query";
import { searchBoard } from "api/Board";
import { SearchBoardParams } from "models/Board.interface";
import {
  SearchRoomContent,
  SearchRoomParams,
  SearchRoomResponse,
} from "models/Room.interface";
import { searchRoom } from "api/Room";

export const RoomList = () => {
  const [roomList, setRoomList] = useState<SearchRoomContent[]>([]);
  const [filterActive, setFilterActive] = React.useState<boolean>(false);
  const [activeCat, setActiveCat] = React.useState<string>("전체");
  const activeHandler = (value: string) => {
    setActiveCat(value);
  };

  const params: SearchRoomParams = {
    // constraints: "FREE",
    page: 0,
    size: 10,
    sortBy: "LATEST",
  };
  const { data, isLoading, isError } = useQuery<SearchRoomResponse, Error>({
    queryKey: ["roomList"],
    queryFn: () => searchRoom(params),
  });

  const filterHandler = () => {
    setFilterActive(!filterActive);
  };

  useEffect(() => {
    if (data?.content) {
      setRoomList(data.content);
    }
  }, [data]);
  return (
    <Wrapper>
      <SearchBarContainer>
        <Form>
          <DropDowns>
            <option value="제목+설명">제목+설명</option>
            <option value="방장명">방장명</option>
          </DropDowns>
          <SearchBar placeholder="검색어를 입력하세요"></SearchBar>
          <Shoot>
            <Img src={Search} alt="" />
          </Shoot>
        </Form>
        <Filter>
          <FilterIcon onClick={filterHandler}>
            <img src={FilterImg} alt="" />
          </FilterIcon>
          {filterActive && <FilterMenu />}
        </Filter>
      </SearchBarContainer>
      <MainContainer>
        <LeftContainer>
          <Button onClick={() => activeHandler("전체")}>전체</Button>
          <Button onClick={() => activeHandler("최신순")}>최신순</Button>
          <Button onClick={() => activeHandler("오래된순")}>오래된순</Button>
          <Button onClick={() => activeHandler("참여인원순")}>
            참여인원순
          </Button>
        </LeftContainer>
        <ListContainer>
          {roomList.map((temp) => (
            <Items key={temp.roomId} {...temp} />
          ))}
        </ListContainer>
        <RightContainer></RightContainer>
      </MainContainer>
    </Wrapper>
  );
};

const Items = tw(RoomItem)`
flex
flex-col
justify-start
gap-5
`;

const Wrapper = tw.div`
flex
flex-col
items-center
gap-5
`;

const RightContainer = tw.div`
w-1/6
`;
const LeftContainer = tw.div`
m-3
flex
flex-col
w-1/6
gap-3
items-center
`;
const ListContainer = tw.div`
flex
flex-col
gap-5
w-4/6
`;

const Button = tw.button`
w-3/4
border-2
p-2
rounded-md
focus:bg-gray-600
hover:bg-gray-500
focus:text-white
transition
`;
const MainContainer = tw.div`
flex
w-full
`;
const SearchBarContainer = tw.div`
w-full
flex
justify-center
`;
const DropDowns = tw.select`
`;
const Shoot = tw.button`
`;
const SearchBar = tw.input`
  focus:outline-none
`;
const Img = tw.img`
w-4
`;
const Form = tw.form`
  flex
  w-5/6
  items-center
  justify-end
`;

const FilterIcon = tw.button`
  rounded-full
  w-4
`;

const Filter = tw.div`
  w-1/6
  flex
  justify-start
  ml-5
  items-start
  relative
  `;
