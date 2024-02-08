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
      <div>
        <StyledCalendar locale="en" onChange={setToday} value={today} />
      </div>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
text-white
w-full
h-full
`;

const StyledCalendar = styled(Calendar)``;
