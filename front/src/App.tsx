import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Common/Navigation/NavBar";
import { RoomList } from "./pages/RoomList";
import { Mainpage } from "./pages/Mainpage";
import { Community } from "./pages/Community";
import { Mypage } from "./pages/Mypage";
import { Room } from "./pages/Room";
import ConditionCheck from "./pages/ConditionCheck";
import { RecruitBoardList } from "./pages/RecruitBoardList";
import { FreeBoardList } from "./pages/FreeBoardList";
//import { RecruitBoardDetail } from "./pages/RecruitBoardDetail";
import Board from "./pages/Board";
import { BoardDetail } from "./pages/BoardDetail";
import { UseSelector, useSelector } from "react-redux";
import ProfileEdit from "pages/ProfileEdit";
import RoomCreate from "pages/RoomCreate";
import tw from "tailwind-styled-components";
import RoomModify from "pages/RoomModify";
import WriteArticle from "pages/WriteArticle";


function App() {
  //임시
  const user = useSelector((state) => state);
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="App h-dvh">
      <BrowserRouter>
        <NavBarContainer>
          <NavBar />
        </NavBarContainer>
        <RoutesContainer>
          <Routes>
            <Route path="/" element={<Mainpage />} />

            <Route path="/room-regist" element={<RoomCreate />} />
            <Route path="/room-modify/:roomId" element={<RoomModify />} />
            <Route path="/roomlist" element={<RoomList />} />


            {/* 커뮤니티인데 곧 삭제 예정... */}
            <Route path="/community" element={<Community />} />

            {/* 모집 게시판 */}
            <Route path="/recruit-board" element={<RecruitBoardList />} />

            <Route
              path="/recruit-board/edit"
              element={<Board isFree={true} isEdit={true} />}
            />
            {/* 모집게시판 글 상세보기 */}
            <Route
              path="/recruit-board/:boardId"
              element={<BoardDetail />}
            ></Route>

            {/* 자유 게시판 */}
            <Route path="/free-board" element={<FreeBoardList />}></Route>

            {/* 자유게시판 글 상세보기 */}
            <Route
              path="/free-board/:boardId"
              element={<BoardDetail />}
            ></Route>
            {/* 글 쓰기 & 글 수정 */}
            <Route path="/write-article" element={<WriteArticle />}></Route>

            {/* 마이페이지 */}
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/profile-edit" element={<ProfileEdit />}></Route>
            <Route path="/room/:roomId/*" element={<Room />} />
            <Route path="/before-entrance" element={<ConditionCheck />} />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </div>
  );
}

const NavBarContainer = tw.div`
fixed
w-full
h-12
z-10
`;

const RoutesContainer = tw.div`
pt-12
`;

export default App;
