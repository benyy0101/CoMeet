import React, { useState } from "react";
import { RoomNotice } from "../components/RoomNotice";

import Notice from "../assets/img/notice.svg";

import tw from "tailwind-styled-components";

const NoticeImg = tw.img`
w-5
h-5
`;

export const Community = () => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(true);

  const handleNoticeOpen = () => {
    setIsNoticeOpen(!isNoticeOpen);
  };

  return (
    <div>
      <h1>Community</h1>
      <div className="bg-black w-20">
        <ul>
          <button onClick={handleNoticeOpen}>
            <NoticeImg src={Notice} alt="공지" />
          </button>
          {isNoticeOpen && <RoomNotice />}
        </ul>
      </div>
    </div>
  );
};
