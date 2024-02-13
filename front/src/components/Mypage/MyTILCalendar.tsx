import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { searchTil } from "api/Til";
import TilModal from "./TilModal";

import tw from "tailwind-styled-components";
import styled from "styled-components";

import Star from "assets/img/star.png";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface til {
  date: string;
  id: number;
}

interface tilsProp {
  isMe: boolean;
  memberId: string;
}

export default function MyTILCalendar({ isMe, memberId }: tilsProp) {
  //현재 선택한 날짜
  const [selectedDay, setSelectedDay] = useState<Value>(new Date());
  const [tilList, setTilLIst] = useState<til[]>();

  //클릭한 날짜의 tilId
  const [currentTilId, setCurrentTilId] = useState<number>(0);

  //선택한 날짜 포맷 바꾸기
  const activeDate =
    selectedDay instanceof Date ? moment(selectedDay).format("YYYY-MM-DD") : "";
  // 2024-02-09와 같은 포맷으로 바꾼 것

  //보여주는 달 구하기
  const monthOfActiveDate =
    selectedDay instanceof Date ? moment(selectedDay).format("YYYY-MM") : "";
  const [activeMonth, setActiveMonth] = useState<string>(monthOfActiveDate);

  //바뀌면 activeMonth 값 바꾸기
  const getActiveMonth = (activeStartDate: moment.MomentInput): void => {
    const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
    setActiveMonth(newActiveMonth);
  };

  //날짜 클릭했는가
  const [isTilClick, setIsTilClick] = useState<boolean>(false);

  const handleTilModal = () => {
    setIsTilClick(!isTilClick);
  };

  //TiL 있는 날짜에 컨텐츠 추가하기
  const addTilCheck = ({ date }: any) => {
    const contents = [];

    if (tilList && tilList.length > 0) {
      if (
        tilList.find((til) => til.date === moment(date).format("YYYY-MM-DD"))
      ) {
        contents.push(
          <>
            <img key={date} src={Star} alt="" className="w-5" />
          </>
        );
      }
    }

    return <div>{contents}</div>;
  };

  //til 리스트 업데이트 (달 바뀔 때마다)
  const getTils = async () => {
    const currentYear: number = parseInt(activeMonth.split("-")[0]);
    const currentMonth: number = parseInt(activeMonth.split("-")[1]);
    const tils = searchTil({
      memberId: memberId,
      year: currentYear,
      month: currentMonth,
    }).then((res) => {
      const convertedTils: til[] = res.content.map((item) => ({
        date: item.date,
        id: item.id,
      }));

      setTilLIst(convertedTils);
    });
  };

  //해당 날짜 클릭 할 때
  const handleDayClick = () => {
    setIsTilClick(true);
  };

  useEffect(() => {
    getTils();
  }, [activeMonth]);

  return (
    <TotalContainer>
      <StyledCalendar
        locale="en-US"
        onChange={setSelectedDay}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        value={selectedDay}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
        tileContent={addTilCheck}
        onClickDay={handleDayClick}
      />
      {/* til 세부 모달 - 클릭한 날짜를 보내야 함 */}
      {isTilClick === true ? (
        <TilModal
          isMe={isMe}
          toggleModal={handleTilModal}
          activeDate={activeDate}
          tilList={tilList}
          refreshTils={getTils}
        />
      ) : null}
    </TotalContainer>
  );
}

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
    height: 50px;
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
