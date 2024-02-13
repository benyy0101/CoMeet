import tw from "tailwind-styled-components";
import RoomItem from "../components/RoomItem";
import { RoomItemProps } from "../types";
import { useEffect, useState } from "react";
import FilterMenu from "components/RoomList/FilterMenu";
import { Link } from "react-router-dom";
import { ChevronDoubleUpIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { searchBoard } from "api/Board";
import { SearchBoardParams } from "models/Board.interface";
import { SearchRoomContent, SearchRoomParams, SearchRoomResponse } from "models/Room.interface";
import { searchRoom } from "api/Room";
import { BackgroundGradient } from "components/Common/BackgroundGradient";

const size = 10;

export const RoomList = () => {
  const [roomList, setRoomList] = useState<SearchRoomContent[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sortByLatest, setSortByLatest] = useState<boolean>(true);

  const { data, isLoading, isError, refetch } = useQuery<SearchRoomResponse, Error>({
    queryKey: ["roomList", sortByLatest ? "LATEST" : "OLDEST", page, size],
    queryFn: () =>
      searchRoom({
        page,
        size,
        sortBy: sortByLatest ? "LATEST" : "OLDEST",
      }),
  });

  useEffect(() => {
    refetch();
  }, [page, sortByLatest]);

  useEffect(() => {
    console.log(data);
    if (data?.content) {
      setRoomList(data.content);
    }
  }, [data]);

  return (
    <Wrapper>
      <BackgroundGradient />
      <MainContainer>
        <LeftContainer>
          <FilterMenu
            setSortByLatest={setSortByLatest}
            sortByLatest={sortByLatest}
            setPage={setPage}
          />
        </LeftContainer>
        <ListContainer>
          <SearchBarContainer>
            <SearchForm>
              <DropDowns>
                <DropdownOption value="제목+설명">제목+설명</DropdownOption>
                <DropdownOption value="방장명">방장명</DropdownOption>
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
mt-20
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
bg-transparent
text-slate-300
`;

const DropdownOption = tw.option`
text-black
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
bg-transparent
text-slate-300
`;

const CustomMagnifyingGlassIcon = tw(MagnifyingGlassIcon)`
h-4
w-4
absolute
right-0
text-slate-300
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
