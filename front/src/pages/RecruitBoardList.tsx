import React, { useState, useEffect } from "react";

import SortingIcon from "../assets/img/sorting.svg";
import SortingDownIcon from "../assets/img/sort-down.svg";
import SettingIcon from "../assets/img/settings.svg";
import SearchImgIcon from "../assets/img/search.svg";

import tw from "tailwind-styled-components";
import { RecruitBoardListLink } from "../components/RecruitBoardListLink";
import { KeywordSearchBox } from "../components/KeywordSearchBox";

type BoardListProps = {
  id: number;
  title: string;
  writerNicname: string;
  writerImage: string;
  createdAt: string;
  likeCount: number;
  category: string;
  type: string;
  roomKeywords: string;
  roomImage: string;
  isValid: boolean;
  roomCapacity: number;
};

export const RecruitBoardList = () => {
  const [boardList, setBoardList] = React.useState<BoardListProps[]>([]);

  const [searchWord, setSearchWord] = React.useState<string>("");

  const handleWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      TmphandleWordCheck(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const TmphandleWordCheck = function () {
    console.log("검색 단어: " + searchWord);
  };

  //임시
  React.useEffect(() => {
    const tmpdatas: BoardListProps[] = [
      {
        id: 1,
        title: "알고리즘 스터디",
        writerNicname: "무빙건",
        writerImage: "https://picsum.photos/id/64/100",
        createdAt: "2024-01-01",
        likeCount: 22,
        category: "",
        type: "recruit",
        roomKeywords: "Python-Java",
        roomImage: "https://picsum.photos/id/1/300",
        isValid: true,
        roomCapacity: 30,
      },
      {
        id: 2,
        title: "CS 스터디",
        writerNicname: "다른 사람",
        writerImage: "https://picsum.photos/id/65/100",
        createdAt: "2024-01-12",
        likeCount: 1,
        category: "",
        type: "recruit",
        roomKeywords: "Spring-Back-Java-BackEnd",
        roomImage: "https://picsum.photos/id/20/300",
        isValid: false,
        roomCapacity: 25,
      },
    ];
    setBoardList(tmpdatas);
  }, []);

  return (
    <TotalContainer>
      <Wrapper>
        <LeftContainer>
          <SideButton>전체</SideButton>
          <SideButton>모집중</SideButton>
          <SideButton>모집완료</SideButton>
        </LeftContainer>
        <CenterTotalContainer>
          <CoreTotalContainer>
            <BoardListTitle>모집게시판</BoardListTitle>
            <BoardListHeader>
              <SortCountContainer>
                <SortCountButton>
                  <SortCountImg src={SortingIcon} alt="" />
                  <SortDownImg src={SortingDownIcon} alt="" />
                </SortCountButton>
              </SortCountContainer>
              <SortCountContainer>
                <SortCountButton>
                  <SortCountImg src={SettingIcon} alt="" />
                  <SortDownImg src={SortingDownIcon} alt="" />
                </SortCountButton>
              </SortCountContainer>
              <SearchContainer>
                <div>검색조건 넣는 곳</div>
                <SearchWrapper>
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
                    rounded-lg
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
              <WriteButton>글쓰기버튼</WriteButton>
            </BoardListHeader>
            <ListContainer>
              <hr />
              {/* ReadButton은 임시! */}
              {boardList.map((tmp) => (
                <ReadButton>
                  <RecruitBoardListLink key={tmp.id} {...tmp} />
                </ReadButton>
              ))}
            </ListContainer>
            <div className="flex justify-center mt-16">페이지네이션</div>
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
w-[1200px]
flex

`;

//모집중/모집완료 사이드바
const LeftContainer = tw.div`
w-[200px]
flex
flex-col
pt-[120px]
items-center

`;

//전체, 모집중/모집완료 사이드바 버튼
const SideButton = tw.button`
w-3/4
mx-auto
py-2
rounded-md
hover:bg-gray-500
focus:bg-gray-200
focus:text-black
focus:font-bold
transition
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
my-2
`;

//정렬, 최대인원 설정 버튼 컨테이너
const SortCountContainer = tw.div`

`;

//정렬, 최대인원 설정 버튼
const SortCountButton = tw.button`
flex
items-center
mr-5
ml-1
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

//검색바 컨테이너
const SearchContainer = tw.div`
relative
flex
justify-center
w-full
`;

//검색바 안쪽 컨테이너
const SearchWrapper = tw.div`
flex
justify-center
relative
w-[300px]
`;

//검색 이미지 컨테이너
const SearchImgContainer = tw.div`
flex
absolute
inset-y-0
left-0
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
flex
border
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
w-[200px]
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
