import React from "react";
import tw from "tailwind-styled-components";

const Thumbnail = tw.img`
    w-1/2
    h-1/2
    rounded-md
    border
`;

const Start = tw.button`
    shadow-md
    border-2
    border-blue-500
    rounded-md
    px-4
    py-2
    bg-blue-500
    text-white
    hover:bg-blue-600
`;

function RoomConfirm() {
  return (
    <div>
      <h1> 방제목방제목방제목</h1>
      <Thumbnail
        src="https://picsum.photos/200"
        alt="room thumbnail"
      ></Thumbnail>
      <p> B형 알고리즘을 위한 방입니다.</p>
      <div> 30 / 45</div>
      <Start>입장하기</Start>
    </div>
  );
}

export default RoomConfirm;
