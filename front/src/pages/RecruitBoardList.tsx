import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import SortingIcon from "../assets/img/sorting.svg";
import SortingDownIcon from "../assets/img/sort-down.svg";
import SettingIcon from "../assets/img/settings.svg";
import SearchImgIcon from "../assets/img/search.svg";

import useOutsideClick from "../hooks/useOutsideClick";
import tw from "tailwind-styled-components";
import { RecruitBoardListLink } from "components/BoardList/RecruitBoardListLink";
import { KeywordSearchBox } from "components/BoardList/KeywordSearchBox";
import { Pagination } from "components/BoardList/Pagination";
import SearchBoardResponse, {
  SearchBoardContent,
  SearchBoardParams,
} from "models/Board.interface";
import { useQuery } from "@tanstack/react-query";
import { searchBoard } from "api/Board";
import { BOARD_SORTBY } from "models/Enums.type";

export const RecruitBoardList = () => {
  //목록 리스트
  //const [boardList, setBoardList] = React.useState<BoardListProps[]>([]);
  const [boardList, setBoardList] = React.useState<SearchBoardContent[]>([]);

  const [searchBoardParams, setSearchBoardParams] = useState<SearchBoardParams>(
    {
      boardType: "RECRUIT",
      sortBy: "LATEST",
      page: 0,
      size: 10,
    }
  );
  const [totalElements, setTotalElements] = useState<number>(100); // 초기 값을 얼마로지해야하지
  const [totalPages, setTotalPages] = useState<number>(10); // 초기 값을 얼마로지해야하지
  const [currentPage, setCurrentPage] = useState<number>(0); // 초기 값을 얼마로지해야하지

  //검색 단어
  const [searchWord, setSearchWord] = React.useState<string>("");

  //정렬 - 최신순/좋아요순/모집률순 - 클릭 유무
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const [currentSort, setCurrentSort] = useState<BOARD_SORTBY>("LATEST");
  const sortTable = {
    LATEST: "최신순",
    LIKES: "좋아요순",
    RECRUIT: "모집률순",
  };

  const [isCountOpen, setIsCountOpen] = useState<boolean>(false);

  const [currentCount, setCurrentCount] = useState<number>(25);

  //왼쪽 사이드바 선택 메뉴
  type CurrentMenu = "전체" | "모집중" | "모집완료";
  const [currentMenu, setCurrentMenu] = useState<CurrentMenu>("전체");

  //아래는 모두 페이지네이션 임시
  const [pageNumber, setPageNumber] = useState<number>(0); //pageNumber: 현재 페이지 번호 (0부터 시작)
  const pageSize = 10; // pageSize: 페이지 당 항목 수 (페이지 크기) / 고정
  // const totalPages = 10; //totalPages: 전체 페이지 수
  // const totalElements = 100; //totalElements: 전체 항목 수
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 위치 맨 위로 초기화
    /* api 호출 및 데이터(totalItems, books) 저장 */
  }, [page]);

  const handleWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      TmphandleWordCheck(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const handleSortOpen = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleCountOpen = () => {
    setIsCountOpen(!isCountOpen);
  };

  // const handleMaxCount = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleMaxCount = (e: any) => {
    setCurrentCount(Number(e.target.value));
  };

  const TmphandleWordCheck = function () {
    console.log("검색 단어: " + searchWord);
  };

  //정렬 드롭다운 외부 클릭시 닫기
  const sortOpenRef = useRef(null);
  useOutsideClick<HTMLDivElement>(sortOpenRef, () => {
    if (isSortOpen) {
      setIsSortOpen(false);
    }
  });

  //방 최대 인원 드롭다운 외부 클릭시 닫기
  const countOpenRef = useRef(null);
  useOutsideClick<HTMLDivElement>(countOpenRef, () => {
    if (isCountOpen) {
      setIsCountOpen(false);
    }
  });

  const { data: QDboardList } = useQuery<SearchBoardResponse, Error>({
    queryKey: ["boardList", JSON.stringify(searchBoardParams)],
    queryFn: () => {
      console.log("execute query", searchBoardParams);
      return searchBoard(searchBoardParams);
    },
  });

  useEffect(() => {
    if (page) {
      searchBoardParams.page = parseInt(page) - 1;
      setSearchBoardParams(searchBoardParams);
    }
  }, [page]);

  useEffect(() => {
    if (currentMenu === "전체") {
      delete searchBoardParams.isValid;
    } else if (currentMenu === "모집중") {
      searchBoardParams.isValid = true;
    } else {
      searchBoardParams.isValid = false;
    }
    setSearchBoardParams(searchBoardParams);
  }, [currentMenu]);

  useEffect(() => {
    searchBoardParams.sortBy = currentSort;
    setSearchBoardParams(searchBoardParams);
  }, [currentSort]);

  useEffect(() => {
    searchBoardParams.capacity = currentCount;
    setSearchBoardParams(searchBoardParams);
  }, [currentCount]);

  useEffect(() => {
    if (QDboardList?.content) {
      console.log(QDboardList);
      setBoardList(QDboardList.content);
    }
  }, [QDboardList]);

  return (
    <TotalContainer>
      <Wrapper>
        <LeftContainer>
          {currentMenu === "전체" ? (
            <SideButtonSelected onClick={() => setCurrentMenu("전체")}>
              전체
            </SideButtonSelected>
          ) : (
            <SideButton onClick={() => setCurrentMenu("전체")}>전체</SideButton>
          )}
          {currentMenu === "모집중" ? (
            <SideButtonSelected onClick={() => setCurrentMenu("모집중")}>
              모집중
            </SideButtonSelected>
          ) : (
            <SideButton onClick={() => setCurrentMenu("모집중")}>
              모집중
            </SideButton>
          )}
          {currentMenu === "모집완료" ? (
            <SideButtonSelected onClick={() => setCurrentMenu("모집완료")}>
              모집완료
            </SideButtonSelected>
          ) : (
            <SideButton onClick={() => setCurrentMenu("모집완료")}>
              모집완료
            </SideButton>
          )}
        </LeftContainer>
        <CenterTotalContainer>
          <CoreTotalContainer>
            <BoardListTitle>모집게시판</BoardListTitle>
            <BoardListHeader>
              <SearchContainer>
                <SearchWrapper>
                  <SearchDropDowns>
                    <option selected value="제목+설명">
                      제목+본문
                    </option>
                    <option value="작성자">작성자</option>
                  </SearchDropDowns>
                  <SearchImgContainer>
                    <SearchImg src={SearchImgIcon} alt="search-Icon" />
                  </SearchImgContainer>
                  {/* 아래의 검색 input을 styled-component으로 만들어서 적용하면 tw.input의 스타일과 겹쳐서 적용이 안 됨 */}
                  <input
                    className="bg-gray-50
                    border
                    border-gray-300
                    text-gray-900
                    text-sm
                    rounded-r-lg
                    focus:ring-blue-500
                    focus:border-blue-500
                    block
                    w-full
                    pl-10
                    p-2.5
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:text-white
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
                    type="search"
                    id="simple-search"
                    value={searchWord}
                    onChange={handleWord}
                    onKeyDown={handleOnKeyPress}
                    placeholder="검색어를 입력해주세요"
                    required
                  />
                </SearchWrapper>
              </SearchContainer>
              <WriteButton>글쓰기</WriteButton>
            </BoardListHeader>
            <SortCountBothContainer>
              <SortCountContainer>
                <SortCountButton onClick={handleSortOpen}>
                  <SortCountImg src={SortingIcon} alt="" />
                  <SortDownImg src={SortingDownIcon} alt="" />
                  {isSortOpen && (
                    <ul ref={sortOpenRef} className="flex justify-center">
                      <SortDropDown>
                        <Sortbutton
                          onClick={() => {
                            setCurrentSort("LATEST");
                            setIsSortOpen(false);
                          }}
                        >
                          최신순
                        </Sortbutton>
                        <Sortbutton
                          onClick={() => {
                            setCurrentSort("LIKES");
                            setIsSortOpen(false);
                          }}
                        >
                          좋아요순
                        </Sortbutton>
                        <Sortbutton
                          onClick={() => {
                            setCurrentSort("RECRUIT");
                            setIsSortOpen(false);
                          }}
                        >
                          모집률순
                        </Sortbutton>
                      </SortDropDown>
                    </ul>
                  )}
                  <SortCountText>{sortTable[currentSort]}</SortCountText>
                </SortCountButton>
              </SortCountContainer>
              <SortCountContainer>
                <SortCountButton onClick={handleCountOpen}>
                  <SortCountImg src={SettingIcon} alt="" />
                  <SortDownImg src={SortingDownIcon} alt="" />
                  {isCountOpen && (
                    <div>
                      <ul ref={countOpenRef} className="flex justify-center">
                        <SortDropDown>
                          <CountText>최대 인원 수</CountText>
                          <CountInputContainer>
                            <MaxMinNum>0</MaxMinNum>
                            <input
                              onMouseUp={handleMaxCount}
                              min="0"
                              max="50"
                              type="range"
                              className="w-2/3 mx-1"
                            />
                            <MaxMinNum>50</MaxMinNum>
                          </CountInputContainer>
                        </SortDropDown>
                      </ul>
                    </div>
                  )}
                  <SortCountText>{currentCount}명</SortCountText>
                </SortCountButton>
              </SortCountContainer>
            </SortCountBothContainer>

            <ListContainer>
              {/* ReadButton은 임시! */}
              {boardList.map((tmp) => {
                if (tmp.type === "RECRUIT")
                  return (
                    <ReadButton>
                      <RecruitBoardListLink key={tmp.id} {...tmp} />
                    </ReadButton>
                  );
              })}
            </ListContainer>
            <div className="flex justify-center mt-16">
              <Pagination
                totalElements={totalElements}
                totalPages={totalPages}
                currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1}
              />
            </div>
          </CoreTotalContainer>
        </CenterTotalContainer>

        <RightContainer>
          <KeywordSearchBox />
        </RightContainer>
      </Wrapper>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex

w-full
h-full
bg-[#070311]
pt-10
pb-20
min-h-svh
min-w-[1200px]
text-white
`;

const Wrapper = tw.div`
mx-auto
w-[1400px]
flex

`;

//모집중/모집완료 사이드바
const LeftContainer = tw.div`
w-[300px]
flex
flex-col
pt-[120px]
items-center

`;

//전체, 모집중/모집완료 사이드바 버튼
const SideButton = tw.button`
w-2/4
ml-10
py-2
rounded-md
hover:bg-gray-500
focus:bg-gray-200
focus:text-black
focus:font-bold
transition
`;

const SideButtonSelected = tw.button`
w-2/4
ml-10
py-2
rounded-md
bg-gray-200
text-black
font-bold
`;

//모집게시판 타이틀 - '모집게시판' 글씨
const BoardListTitle = tw.div`
flex
justify-center
text-3xl
mb-9

`;

//모집게시판 헤더 - 정렬버튼, 인원 설정, 검색바, 글쓰기버튼
const BoardListHeader = tw.div`
flex
items-center
w-full
my-3
pb-2
border-b
`;

const SortCountBothContainer = tw.div`
flex
ml-2
my-4
w-full
`;

//정렬, 최대인원 설정 버튼 컨테이너
const SortCountContainer = tw.div`
flex
ml-2

`;

//정렬, 최대인원 설정 버튼
const SortCountButton = tw.button`
flex
items-center
`;

//정렬, 최대인원 숫자
const SortCountText = tw.div`
text-[12px]
ml-1
border-b
`;

//정렬 드롭다운
const SortDropDown = tw.div`
    flex
    flex-col
    absolute
    text-black
    mt-2
    py-2
    px-1
    z-50
    rounded-lg
    shadow-lg
    rounded-md
    bg-gray-300
`;

const Sortbutton = tw.button`
rounded-lg
w-full
px-4
py-2
text-xs
cursor-pointer
text-black
hover:bg-gray-100
focus:bg-gray-100
`;

//정렬, 최대인원 설정 이미지
const SortCountImg = tw.img`
w-5
h-5
`;

//정렬, 최대인원 옆에 아래로 향하는 화살표 이미지
const SortDownImg = tw.img`
w-3
h-3
`;

//글씨
const CountText = tw.div`
text-xs
font-medium
`;

//드롭다운 input 컨테이너
const CountInputContainer = tw.div`
flex
justify-center
`;

//최소, 최대숫자
const MaxMinNum = tw.div`
text-xs
`;

//검색바 컨테이너
const SearchContainer = tw.div`
relative
flex
flex-grow
justify-center
items-center

`;

//검색 셀렉트 박스 => 제목+설명
const SearchDropDowns = tw.select`
px-2
text-white
bg-gray-900
w-[120px]
rounded-l-lg
`;

//검색바 안쪽 컨테이너
const SearchWrapper = tw.div`
flex
justify-center
relative
w-[650px]
`;

//검색 이미지 컨테이너
const SearchImgContainer = tw.div`
flex
absolute
inset-y-0
left-[120px]
items-center
pl-3
pointer-events-none
z-index: 1;
`;

//검색 이미지
const SearchImg = tw.img`
w-5
h-5

`;

// //검색 인풋창
// const SearchInput = tw.input`

// `;

//글쓰기버튼 컨테이너
const WriteButton = tw.button`
  mr-2
  inline-flex
  items-center
  py-2
  px-4
  text-sm
  font-medium
  text-center
  text-white
  rounded-lg
  bg-gradient-to-l
from-[#539AB1]
to-[#7C5EBD]
hover:bg-gradient-to-r
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
`;

//가운데 컨테이너 - 사이드바로 빠지는 정렬 외 모든 애들
const CenterTotalContainer = tw.div`
flex-grow
flex
justify-center

`;

//진짜 모집게시판 리스트
const CoreTotalContainer = tw.div`
w-[800px]
h-full
mb-5
p-5
`;

//키워드 검색 가능한 오른쪽 사이드 바
const RightContainer = tw.div`
w-[300px]
pt-[120px]

`;

//글 리스트 컨테이너
const ListContainer = tw.div`
flex flex-col
`;

// 임시
// 글 보기 버튼
const ReadButton = tw.button`
hover:bg-gray-800
`;
