import React, { useState } from "react";
import { Link } from "react-router-dom";

import tw from "tailwind-styled-components";
import { TailwindComponent } from "tailwind-styled-components/dist/tailwind";

type styledType = TailwindComponent<React.HTMLAttributes<HTMLDivElement>, {}>;

//css 스타일 컴포넌트
//StyleRoomNav: 방의 SubNavBar=
const StyleRoomNav: styledType = tw.div`
    pt-12
    flex
    flex-col
    items-center
    
`;

const RoomSubNavBar: React.FC<{
  handleChangeValue: () => void;
  handleChangeLoungeId: (lId: number) => void;
  handleChangeFoldTrue: () => void;
}> = (props) => {
  //채널 들어갈 때 작동
  const handleChangeClick = () => {
    props.handleChangeValue();
  };

  //라운지 들어갈 때 작도
  const handleChangeLoungenumber = () => {
    const loundeId = 1;
    props.handleChangeLoungeId(loundeId);
  };

  const handleFoldTrue = () => {
    props.handleChangeFoldTrue();
  };

  //임시
  const roomId = "1";
  const channelId = "2";

  return (
    <div>
      <br />
      <button onClick={handleFoldTrue}>&lt; </button>
      <StyleRoomNav>
        <p>라운지</p>
        <button onClick={handleChangeLoungenumber}>[라운지1]</button>
        <button>[라운지2]</button>
        <br />
        <p>채널</p>
        <button onClick={handleChangeClick}>
          <Link to={`/room/${roomId}/channel/${channelId}`}>채널1</Link>
        </button>
        <button>채널2</button>
      </StyleRoomNav>
      <br />
      <button>+</button>
    </div>
  );
};

export default RoomSubNavBar;
