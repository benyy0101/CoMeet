import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  totalElements: number; //*데이터의 총 개수 - totalElements
  itemCountPerPage: number; //*페이지 당 보여줄 데이터 개수 - size
  totalPages: number; //*총 페이지 개수 - totalPages
  pageCount: number; //보여줄 페이지 개수
  currentPage: number; //현재 페이지* - pageNumber 보낼 거
}

export const Pagination = () =>
  //     {
  //   totalElements,
  //   itemCountPerPage,
  //   totalPages,
  //   pageCount,
  //   currentPage,
  // }: Props
  {
    const [pageNumber, setPageNumber] = useState<number>(0); //pageNumber: 현재 페이지 번호 (0부터 시작)
    const pageSize: number = 10; // pageSize: 페이지 당 항목 수 (페이지 크기) / 고정
    const totalPages: number = 6; //totalPages: 전체 페이지 수
    const totalElements = 50; //totalElements: 전체 항목 수

    const pageCount: number = 5; // pageCount: 보여줄 페이지 갯수

    const [start, setStart] = useState<number>(1); //시작 번호
    const noPrev = start === 120;
    const noNext = start + pageCount - 1 >= totalPages;

    //보여줄 페이지 설정
    useEffect(() => {
      if (pageNumber === start + pageCount - 1)
        setStart((prev) => prev + pageCount);
      if (pageNumber < start - 1) setStart((prev) => prev - pageCount);
    }, [pageNumber, pageCount, start]);

    return (
      <div>
        <ul>
          <li>
            <Link to={`?page=${start - 1}`}>이전</Link>
          </li>
          <li>여긴 페이지 나오는 곳</li>
        </ul>
      </div>
    );
  };
