import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

interface Props {
  totalElements: number; //*데이터의 총 개수 - totalElements
  totalPages: number; //*총 페이지 개수 - totalPages
  currentPage: number; //현재 페이지*
}

export const Pagination = ({
  totalElements,
  totalPages,
  currentPage,
}: Props) => {
  // const currentPage = 1; //currentPage: 현재 페이지 번호 (0부터 시작)
  const pageSize: number = 10; // pageSize: 페이지 당 항목 수 (페이지 크기) / 고정
  // const totalPages: number = 10; //totalPages: 전체 페이지 수
  // const totalElements = 100; //totalElements: 전체 항목 수

  const pageCount: number = 5; // pageCount: 보여줄 페이지 갯수

  const [start, setStart] = useState<number>(1); //시작 번호
  const noPrev = start === 1;
  const noNext = start + pageCount >= totalPages;

  //보여줄 페이지 설정
  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div>
      <ul className="flex">
        {!noPrev && (
          <Prev>
            <Link to={`?page=${start - 1}`}>이전</Link>
          </Prev>
        )}
        {[...Array(pageCount)].map((_, i) => {
          const page = start + i;
          if (page <= totalPages) {
            return (
              <Link to={`?page=${page}`}>
                <NumberPage
                  key={i}
                  className={`${currentPage === start + i ? "bg-white text-black font-bold" : ""}`}
                >
                  {page}
                </NumberPage>
              </Link>
            );
          }
          return null;
        })}
        {!noNext && (
          <Next>
            <Link to={`?page=${start + pageCount}`}>다음</Link>
          </Next>
        )}
      </ul>
    </div>
  );
};

const NumberPage = tw.li`
mx-2
rounded-full
w-8
h-8
flex
justify-center
items-center
hover:border
text-gray-300
`;

const Prev = tw.li`
flex items-center mr-1`;

const Next = tw.li`
flex items-center ml-1
`;
