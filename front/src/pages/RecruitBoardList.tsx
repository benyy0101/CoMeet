import React, { useState, useEffect } from "react";

import tw from "tailwind-styled-components";
import { RecruitBoardListLink } from "../components/RecruitBoardListLink";

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
        roomKeywords: "Spring-Back",
        roomImage: "https://picsum.photos/id/20/300",
        isValid: false,
        roomCapacity: 25,
      },
    ];
    setBoardList(tmpdatas);
  }, []);

  return (
    <TotalContainer>
      <LeftContainer>
        <div>사이드바임</div>
        <div>전체</div>
        <div>모집중</div>
        <div>모집완료</div>
      </LeftContainer>
      <CenterTotalContainer>
        <CoreTotalContainer>
          <BoardListTitle>모집게시판</BoardListTitle>
          <BoardListHeader>
            <SortCountContainer>
              <SortCountButton>정렬 버튼</SortCountButton>
            </SortCountContainer>
            <SortCountContainer>
              <SortCountButton>인원수 조절 버튼</SortCountButton>
            </SortCountContainer>
            <SearchContainer>게시글검색바</SearchContainer>
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
        <div>키워드 검색</div>
      </RightContainer>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
w-full
h-full
bg-[#070311]
pt-14
pb-20
min-h-svh
text-white
border
`;

//모집중/모집완료 사이드바
const LeftContainer = tw.div`
w-[200px]
ml-20
border
`;

//가운데 컨테이너 - 사이드바로 빠지는 정렬 외 모든 애들
const CenterTotalContainer = tw.div`
flex-grow
flex
justify-center
border
`;

//진짜 모집게시판 리스트
const CoreTotalContainer = tw.div`
flex-grow
max-w-[800px]
h-full
mb-5
`;

//키워드 검색 가능한 오른쪽 사이드 바
const RightContainer = tw.div`
w-[200px]
mr-20
border
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
`;

//정렬, 최대인원 설정 버튼 컨테이너
const SortCountContainer = tw.div``;

//정렬, 최대인원 설정 버튼
const SortCountButton = tw.button``;

//정렬, 최대인원 설정 이미지
const SortCountImg = tw.img``;

//검색바 컨테이너
const SearchContainer = tw.div``;

//글쓰기버튼 컨테이너
const WriteButton = tw.button``;

//글 리스트 컨테이너
const ListContainer = tw.div`
flex flex-col
`;

// 임시
// 글 보기 버튼
const ReadButton = tw.button`
hover:bg-gray-200
`;
