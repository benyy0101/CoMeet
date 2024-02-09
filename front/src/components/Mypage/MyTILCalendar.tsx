import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import tw from "tailwind-styled-components";
import styled from "styled-components";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MyTILCalendar = () => {
  const [today, setToday] = useState<Value>(new Date());

  return (
    <TotalContainer>
      <StyledCalendar
        locale="en-US"
        onChange={setToday}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        value={today}
      />
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
flex
flex-col
items-center
w-full
h-full
`;

const StyledCalendar = styled(Calendar)`
  // 달력 크기 및 기본 설정
  flex-grow: 1;
  width: 100%;
  border: none;

  // 중앙 정렬 -
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  border-radius: 0.75rem;

  color: white;
  background-color: #3c334d;

  //네비게이션바
  .react-calendar__navigation {
    width: 100%;
    //border-bottom: 4px solid white;
    height: 15%;

    span {
      font-size: 24px;
      font-weight: 900;
      color: white;
    }
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
    border-radius: 20px;
    span {
      font-size: 24px;
      font-weight: 900;
      color: black;
    }
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: white;
    border-radius: 20px;
    color: black;
    span {
      font-size: 24px;
      font-weight: 900;
      color: black;
    }
  }

  //월 달력의 요일
  abbr[title] {
    text-decoration: none;
  }

  //월 달력
  .react-calendar__month-view {
    abbr {
      // 텍스트
      font-size: 16px;
      font-weight: 500;
    }
  }

  //월 달력의 요일
  .react-calendar__month-view__weekdays {
    abbr {
      // 텍스트 부분
      font-size: 18px;
      font-weight: 700;
    }
  }

  //일 (각 타일)
  .react-calendar__tile {
    text-align: center;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: white;
    border-radius: 14px;
    color: black;
  }

  //현재 날짜
  .react-calendar__tile--now {
    background: gray;
    border-radius: 14px;
    color: white;
  }
`;
