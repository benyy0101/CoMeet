import React from "react";
import tw from "tailwind-styled-components";
import RoomItem from "../components/RoomItem";
import Search from "../assets/img/search.svg";
import FilterImg from "../assets/img/filter.png";
import FilterMenu from "../components/FilterMenu";
import { RoomItemProps } from "../types";

export const RoomList = () => {
  const [roomList, setRoomList] = React.useState<RoomItemProps[]>([]);
  const [filterActive, setFilterActive] = React.useState<boolean>(false);
  const [activeCat, setActiveCat] = React.useState<string>("전체");
  const activeHandler = (value: string) => {
    setActiveCat(value);
  };

  const filterHandler = () => {
    setFilterActive(!filterActive);
  };

  React.useEffect(() => {
    // 일단 더미 데이터로 대체
    const fetchedTemps: RoomItemProps[] = [
      {
        title: "방제목2",
        roomId: "1",
        managerId: "방장아이디임 닉네임임?",
        description: "방설명이 짧으니가 뭐가 이상하네요",
        url: "url1",
        roomImage: "https://picsum.photos/100",
        maxcount: 45,
        isLocked: false,
        password: "1234",
        constraint: "B",
      },
      {
        title: "방제목2",
        roomId: "2",
        managerId: "zeroGun",
        description: "방설명도 좀 긴게 좋을것 같습니다.",
        url: "url2",
        roomImage: "https://picsum.photos/100",
        maxcount: 30,
        isLocked: true,
        password: "5678",
        constraint: "A",
      },
    ];
    setRoomList(fetchedTemps);
  }, []);

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
          <Button onClick={() => activeHandler("참여인원순")}>참여인원순</Button>
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
