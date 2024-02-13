import React, { useState, useRef } from "react";
import { RoomNotice } from "../components/RoomNotice";
import useOutsideClick from "../hooks/useOutsideClick";

import Notice from "../assets/img/notice.svg";
import tw from "tailwind-styled-components";

const NoticeImg = tw.img`
w-5
h-5
`;

export const Community: React.FC = () => {
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  const handleNoticeOpen = () => {
    setIsNoticeOpen(!isNoticeOpen);
  };

  // useOutsideClick: 외부 클릭시 닫히는 커스텀훅
  useOutsideClick<HTMLDivElement>(noticeRef, () => {
    if (isNoticeOpen) {
      setIsNoticeOpen(false);
    }
  });

  return (
    <div>
      <h1>Community</h1>
      <div className="bg-black w-20" ref={noticeRef}>
        <button onClick={handleNoticeOpen}>
          <NoticeImg src={Notice} alt="공지" />
        </button>
        {isNoticeOpen && <RoomNotice text={""} />}
      </div>
    </div>
  );
};

export default Community;
