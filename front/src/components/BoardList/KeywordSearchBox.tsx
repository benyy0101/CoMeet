import React, { useState, ChangeEvent, useRef, useEffect, Component } from "react";
import useOutsideClick from "hooks/useOutsideClick";

import XIcon from "assets/img/x-icon.svg";

import tw from "tailwind-styled-components";
import { Keyword } from "models/Util";
import { searchKeyword } from "api/Keyword";
import { useSelector } from "react-redux";
import { KeywordState } from "models/Keyword.interface";

interface Props {
  sendKeyword: (data: Keyword[]) => void;
}

// 키워드 타입도 예시
export const KeywordSearchBox = ({ sendKeyword }: Props) => {
  const keywordArr = useSelector((state: any) => state.keyword.keywords);

  //검색 단어
  const [search, setSearch] = useState<string>("");

  //키워드 드롭박스 나오게
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //검색으로 필터된 키워드 배열
  const [filteredKeywords, setFilteredKeywords] = useState<Keyword[]>(keywordArr);

  //선택된 배열
  const [selectKeywords, setSelectKeywords] = useState<Keyword[]>([]);

  //토글박스 보이는지
  const toggleListboxVisibility = () => {
    setIsOpen(!isOpen);
  };

  //검색어 바뀔 때마다 실행
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    //검색어에 해당하는 배열만 드롭박스로 보이게 (대소문자 상관 X)
    const filtered = keywordArr.filter((keyword: any) =>
      keyword.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    //
    setFilteredKeywords(filtered);
  };

  //키워드 추가했을 때
  const handleClickKeyword = (id: number) => {
    //addKeyword: 추가할 단어
    const addKeyword = keywordArr.find((keyword: any) => keyword.id == id);
    //isIn: 이미 선택된 배열에 있는지 확인
    const isIn = selectKeywords.find((keyword) => keyword.id == id);

    //추가할 단어가 있고, 이미 선택한 배열에 없는 단어라면 selectKeywords에 넣기
    if (addKeyword && !isIn) {
      setSelectKeywords([...selectKeywords, addKeyword]);
    }
  };

  //키워드 삭제할 때
  const handleDeleteKeyword = (id: number) => {
    const deleteIndex = selectKeywords.findIndex((keyword) => keyword.id == id);
    console.log(deleteIndex);
    const storeSelectKeywords = [...selectKeywords];
    const newKeywords = storeSelectKeywords.splice(deleteIndex, 1);
    setSelectKeywords(storeSelectKeywords);
  };

  //외부 클릭시 키워드 드롭다운 닫기
  const keywordDropDownRef = useRef(null);
  useOutsideClick<HTMLDivElement>(keywordDropDownRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  //상위로 키워드 전달
  useEffect(() => {
    if (selectKeywords) {
      sendKeyword(selectKeywords);
    }
  }, [selectKeywords]);

  return (
    <TotalContainer>
      <KeywordSearchTitle className="">키워드 검색</KeywordSearchTitle>
      {/* 선택한 키워드 올라오는 곳 */}
      <KeywordUpBox>
        {selectKeywords.map((item) => (
          <KeywordButton onClick={() => handleDeleteKeyword(item.id)}>
            {item.name}
            <XIconImg src={XIcon} alt="" />
          </KeywordButton>
        ))}
      </KeywordUpBox>
      <KeywordSearchButtonContainer className="">
        {isOpen ? null : (
          <KeywordSearchButton onClick={toggleListboxVisibility}>
            키워드로 검색해보세요
          </KeywordSearchButton>
        )}
      </KeywordSearchButtonContainer>
      {isOpen && (
        <KeywordSearchContainer ref={keywordDropDownRef}>
          <KeywordSearchInput
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="키워드 입력하기"
          />
          <KeywordSearchDropBox>
            {/* 이 아래 li는 styled-component로 하면 충돌나서 css가 깨짐 */}
            {filteredKeywords.length > 0 ? (
              filteredKeywords.map((keyword) => (
                <li key={keyword.id}>
                  <KeywordClickButton className="" onClick={() => handleClickKeyword(keyword.id)}>
                    {keyword.name}
                  </KeywordClickButton>
                </li>
              ))
            ) : (
              <li
                style={{ cursor: "default" }}
                className="py-2
  flex
  flex-col w-full
  bg-gray-200
  text-black
  px-2
  text-sm
  rounded-b-lg
  "
              >
                찾으시는 키워드가 없습니다
              </li>
            )}
          </KeywordSearchDropBox>
        </KeywordSearchContainer>
      )}
    </TotalContainer>
  );
};

//키워드 검색 박스
const TotalContainer = tw.div`
border
border-[#2D0F6C]
w-3/4
mx-auto
bg-[#1B1033]
rounded-lg
py-3
flex
flex-col
items-center
`;

//`키워드 검색` 타이틀
const KeywordSearchTitle = tw.div`
font-bold
text-center
p-2
`;

// 키워드 박스
const KeywordUpBox = tw.div`
flex
justify-center
overflow-auto
flex
flex-wrap
mx-2
mt-1
mb-2
`;

// 키워드 버튼
const KeywordButton = tw.button`
flex
justify-center
items-center
m-1
p-1
rounded-lg
bg-gray-700
text-[15px]
`;

// 엑스 아이콘
const XIconImg = tw.img`
w-4
h-4
`;

//키워드 검색 누르는 버튼 컨테이너
const KeywordSearchButtonContainer = tw.div`
w-full
flex
justify-center
my-1
`;

//키워드 검색 누르는 버튼
const KeywordSearchButton = tw.button`
p-3
rounded-lg
bg-gradient-to-l
from-[#539AB1]
to-[#7C5EBD]
hover:bg-gradient-to-r
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
w-[200px]
text-sm
font-semibold
`;

//input, 드롭박스 나오는 컨테이너
const KeywordSearchContainer = tw.div`
rounded-lg
w-[200px]
`;

//키워드 서치하는 인풋
const KeywordSearchInput = tw.input`
text-black
w-full
h-[40px]
px-2
rounded-t-lg
`;

//키워드 드롭박스
const KeywordSearchDropBox = tw.ul`
max-h-[200px]
overflow-auto
rounded-b-lg
`;

const KeywordClickButton = tw.button`
py-2
flex
flex-col w-full
bg-white
text-black
px-2
hover:bg-gray-200
focus:bg-gray-200

`;
