import tw from "tailwind-styled-components";
import RoomItem from "../components/RoomItem";
import { RoomItemProps } from "../types";
import { useEffect, useState } from "react";
import FilterMenu from "components/FilterMenu";
import { Link } from "react-router-dom";
import { ChevronDoubleUpIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

export const RoomList = () => {
  const [roomList, setRoomList] = useState<RoomItemProps[]>([]);

  useEffect(() => {
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
      <MainContainer>
        <LeftContainer>
          <FilterMenu />
        </LeftContainer>
        <ListContainer>
          <SearchBarContainer>
            <SearchForm>
              <DropDowns>
                <option value="제목+설명">제목+설명</option>
                <option value="방장명">방장명</option>
              </DropDowns>
              <SearchInputContainer>
                <SearchBar placeholder="검색어를 입력하세요"></SearchBar>
                <CustomMagnifyingGlassIcon />
              </SearchInputContainer>
            </SearchForm>
          </SearchBarContainer>
          {roomList.map((temp) => (
            <Items key={temp.roomId} {...temp} />
          ))}
        </ListContainer>
      </MainContainer>
      <Link to={"/room-regist"}>
        <BottomButton className="right-24">
          <PlusIcon className="w-6 h-6" />
        </BottomButton>
      </Link>
      <BottomButton
        className="right-10"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ChevronDoubleUpIcon className="w-6 h-6" />
      </BottomButton>
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
relative
`;

const LeftContainer = tw.div`
fixed
left-2
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
w-[60rem]
`;

const MainContainer = tw.div`
flex
flex-col
items-center
w-full
relative
pt-10
`;
const SearchBarContainer = tw.div`
w-full
flex
flex-row-reverse
justify-between
py-3
`;

const DropDowns = tw.select`
h-10
p-2
focus:outline-none
`;

const SearchInputContainer = tw.div`
flex
h-10
items-center
justify-end
relative
border-b-[1px]
`;

const SearchBar = tw.input`
w-full
h-full
focus:outline-none
p-2
pr-6
`;
const CustomMagnifyingGlassIcon = tw(MagnifyingGlassIcon)`
h-4
w-4
absolute
right-0
`;

const SearchForm = tw.form`
flex
items-center
space-x-2
`;

const BottomButton = tw.button`
fixed
bottom-6
w-10
h-10
flex
justify-center
items-center
bg-slate-400
hover:bg-slate-500
text-slate-100
rounded-full
`;
