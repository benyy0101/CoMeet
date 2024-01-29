import React from "react";
import { Link } from "react-router-dom";

export const RecruitBoardListLink = () => {
  return (
    <div>
      <Link to="/recruit-board/1">
        <div className="flex">
          <div>방 이미지</div>
          <div>
            <div className="flex">
              <div>글 제목 </div>
              <div>모집 유효</div>
            </div>
            <div>방 키워드</div>
          </div>
          <div>
            <div className="flex">
              <div>작성자이미지</div>
              <div>작성자닉네임</div>
            </div>
            <div>작성 날짜</div>
            <div>좋아요 수</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
