import tw from "tailwind-styled-components";
import RoomItem from "../components/RoomList/RoomItem";
import { RoomItemProps } from "../types";
import { useEffect, useRef, useState } from "react";
import FilterMenu from "components/RoomList/FilterMenu";
import { Link } from "react-router-dom";
import {
  ChevronDoubleUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  useQuery,
  useInfiniteQuery,
  QueryFunction,
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { searchBoard } from "api/Board";
import { SearchBoardParams } from "models/Board.interface";
import {
  SearchRoomContent,
  SearchRoomParams,
  SearchRoomResponse,
} from "models/Room.interface";
import { searchRoom } from "api/Room";
import { ROOM_CONSTRAINTS } from "models/Enums.type";
import { Background } from "components/Common/Backgruond";

const size = 5;

export const RoomList = () => {
  const [roomList, setRoomList] = useState<SearchRoomContent[]>([]);
  const [sortByLatest, setSortByLatest] = useState<boolean>(true);
  const [constraints, setConstraints] = useState<ROOM_CONSTRAINTS | "ALL">(
    "ALL"
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchtype, setSearchtype] = useState<string>("제목+설명");
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useQuery<
    SearchRoomResponse,
    Error
  >({
    queryKey: ["roomList", sortByLatest ? "LATEST" : "OLDEST", size],
    queryFn: () =>
      searchRoom({
        size,
        sortBy: sortByLatest ? "LATEST" : "OLDEST",
        ...(searchtype === "제목+설명" && { searchKeyword }),
        ...(searchtype === "방장명" && { managerNickname: searchKeyword }),
        isLocked,
        ...(constraints !== "ALL" && { constraints: constraints }),
      }),
  });

  useEffect(() => {
    last.current = false;
    page.current = 0;
    console.log(constraints);
    refetch();
  }, [sortByLatest, constraints, isLocked]);

  useEffect(() => {
    console.log(data);
    if (data?.content) {
      setRoomList(data.content);
      last.current = data.last;
    }
  }, [data]);

  const page = useRef<number>(0);
  const last = useRef<boolean>(false);
  const [isScrolled, SetIsScrolled] = useState<number>(0);

  useEffect(() => {
    console.log("isscroll", isScrolled);
    console.log("sortByLatest:", sortByLatest);
    page.current++;
    searchRoom({
      page: page.current,
      size,
      sortBy: sortByLatest ? "LATEST" : "OLDEST",
      ...(searchtype === "제목+설명" && { searchKeyword }),
      ...(searchtype === "방장명" && { managerNickname: searchKeyword }),
      isLocked,
      ...(constraints !== "ALL" && { constraints: constraints }),
    }).then((data) => {
      console.log(data.content);
      setRoomList((prev) => prev.concat(data.content));
      last.current = data.last;
    });
  }, [isScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("room-observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log("last value", last.current);
      if (!last.current) {
        SetIsScrolled((prev) => ++prev);
      }
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    last.current = false;
    page.current = 0;
    refetch();
  };

  return (
    <Wrapper>
      <Background />
      <MainContainer>
        <LeftContainer>
          <FilterMenu
            setSortByLatest={setSortByLatest}
            sortByLatest={sortByLatest}
            // setPage={setPage}
            setConstraints={setConstraints}
            setIsLockedHandler={setIsLocked}
          />
        </LeftContainer>
        <ListContainer>
          <SearchBarContainer>
            <SearchForm onSubmit={submitHandler}>
              <DropDowns
                onChange={(e) => {
                  setSearchtype(e.target.value);
                }}
              >
                <DropdownOption value="제목+설명">제목+설명</DropdownOption>
                <DropdownOption value="방장명">방장명</DropdownOption>
              </DropDowns>
              <SearchInputContainer>
                <SearchBar
                  placeholder="검색어를 입력하세요"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                ></SearchBar>
                <CustomMagnifyingGlassIcon />
              </SearchInputContainer>
            </SearchForm>
          </SearchBarContainer>
          {roomList.map((temp) => (
            <Items key={temp.roomId} {...temp} />
          ))}
          <div id="room-observer"></div>
        </ListContainer>
      </MainContainer>
      <Link to={"/room-regist"}>
        <BottomButton className="right-24">
          <HintContainer>
            <Hint>{"방 만들기"}</Hint>
          </HintContainer>
          <PlusIcon className="w-6 h-6" />
        </BottomButton>
      </Link>
      <BottomButton
        className="right-10"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <HintContainer>
          <Hint>{"맨 위로"}</Hint>
        </HintContainer>
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

const BottomButton = tw.div`
fixed
bottom-6
w-10
h-10
flex
justify-center
items-center
bg-purple-900
hover:bg-purple-800
text-slate-100
rounded-full
cursor-pointer
group
`;

const HintContainer = tw.div`
absolute
left-1/2
-translate-x-1/2
bottom-12
z-10
h-10
bg-[#170f2a]
p-2
rounded-md
border
border-[#d9e5db]
hidden
group-hover:block
`;

const Hint = tw.h1`
text-sm
text-slate-200
whitespace-nowrap
`;
