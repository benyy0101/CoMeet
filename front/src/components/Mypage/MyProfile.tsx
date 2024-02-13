import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import useOutsideClick from "hooks/useOutsideClick";
import ImageModifyModal from "./ImageModifyModal";

import tw from "tailwind-styled-components";

import ProfileImg from "assets/img/test-user.jpeg";
import ProifleModify from "assets/img/profile-modify.svg";
import CarmeraImg from "assets/img/carmera.svg";
import EditPencil from "assets/img/edit-pencil.svg";
import Modal from "components/Common/Modal";
import { profileImageDelete, profileModifyImage } from "api/image";

interface myProps {
  profileImage: string | undefined;
  followingCount: number | undefined;
  followerCount: number | undefined;
  nickname: string | undefined;
  description: string | undefined;
  link: string | undefined;
  handleChange: () => void;
}

export default function MyProfile({
  profileImage,
  followingCount,
  followerCount,
  nickname,
  description,
  link,
  handleChange,
}: myProps) {
  //프로필 사진 마우스 오버로 바꾸기
  const [isHovering, setIsHovering] = useState<boolean>(false);

  //프로필 변경 이미지 클릭시
  const [isModifyImg, setIsModifyImg] = useState<boolean>(false);
  //팔로잉, 팔로워 클릭시
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);

  const followerModalHandler = () => {
    setFollowerModal(!followerModal);
  };
  const followingModalHandler = () => {
    setFollowingModal(!followingModal);
  };

  //프로필 사진 변경 버튼 클릭시
  const [modifyImgModal, setModifyImgModal] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleModifyImg = () => {
    setIsModifyImg(!isModifyImg);
  };

  const handleModifyImgModal = () => {
    setModifyImgModal(!modifyImgModal);
    setIsModifyImg(false);
  };

  //이미지 삭제
  const handleDelteImg = async function () {
    if (profileImage != "default_profile_image_letsgo") {
      //s3에서 이미지 삭제
      profileImageDelete(profileImage);

      //DB에서 삭제
      const updateData = { profileImage: `default_profile_image_letsgo` };
      await profileModifyImage(updateData);
    }
    //수정
    setIsModifyImg(false);

    handleChange();
  };

  //버튼 닫히기
  const modifyImgRef = useRef(null);
  useOutsideClick<HTMLDivElement>(modifyImgRef, () => {
    if (isModifyImg) {
      setIsModifyImg(false);
    }
  });

  // useEffect(() => {
  //   if (profileImage === "default_profile_image_letsgo") {
  //     profileImage = `https://comeet-a506.s3.ap-northeast-2.amazonaws.com/profileImage/basic-profile.svg`;
  //   }
  // }, [profileImage]);

  return (
    <TotalContainer>
      <ProfileModButton>
        <Link to="/profile-edit">
          <ProfileModImg src={ProifleModify} alt="" />
        </Link>
      </ProfileModButton>
      <FullContainer>
        <LeftContainer>
          <ul ref={modifyImgRef}>
            {isHovering ? (
              <StyleProfileImgHover
                style={{
                  backgroundImage: `url(${
                    profileImage === ""
                      ? `https://comeet-a506.s3.ap-northeast-2.amazonaws.com/profileImage/basic-profile.svg`
                      : `${profileImage}`
                  })`,
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <button onClick={handleModifyImg}>
                  <StyleCarmera src={CarmeraImg} alt="" />
                </button>
              </StyleProfileImgHover>
            ) : (
              <StyleProfileImg
                style={{
                  backgroundImage: `url(${
                    profileImage === ""
                      ? `https://comeet-a506.s3.ap-northeast-2.amazonaws.com/profileImage/basic-profile.svg`
                      : `${profileImage}`
                  })`,
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            )}
            {isModifyImg && (
              <ProfileDropdown>
                {/* 변경 클릭시 이미지 업로드 모달 나오게 하기 */}
                <DropdownButton onClick={handleModifyImgModal}>
                  프로필 사진 변경
                </DropdownButton>
                {/* 제거 클릭시 ! 확인 모달 나오게 하기*/}
                <DropdownButton onClick={handleDelteImg}>제거</DropdownButton>
              </ProfileDropdown>
            )}
            {/* 프로필 사진 수정 모달 */}
            {modifyImgModal === true ? (
              <ImageModifyModal
                toggleModal={handleModifyImgModal}
                option="modifyProfile"
                handleChange={handleChange}
                profileImage={profileImage}
              />
            ) : null}
          </ul>
        </LeftContainer>
        <RightContainer>
          <FollowContainer>
            <SytleFollowing onClick={followingModalHandler}>
              {followingModal ? (
                <Modal
                  toggleModal={followingModalHandler}
                  option={"following"}
                ></Modal>
              ) : null}
              <FollowText>팔로잉</FollowText>
              <FollowNumber>{followingCount}</FollowNumber>
            </SytleFollowing>
            <StyleFllower onClick={followerModalHandler}>
              {followerModal ? (
                <Modal
                  toggleModal={followerModalHandler}
                  option={"follower"}
                ></Modal>
              ) : null}
              <FollowText>팔로워</FollowText>
              <FollowNumber>{followerCount}</FollowNumber>
            </StyleFllower>
          </FollowContainer>
          <div className="flex">
            <StyleNickName>{nickname}</StyleNickName>
          </div>
          <div className="flex">
            {description === "" ? (
              <NoneText>한 줄 소개가 없습니다.</NoneText>
            ) : (
              <StyleMessage>{description}</StyleMessage>
            )}
          </div>
          <SytleUrl>
            <StyleA href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </StyleA>
            {/* {link === "" ? (
              <NoneText>ㅤ</NoneText>
            ) : (
            )} */}
          </SytleUrl>
        </RightContainer>
      </FullContainer>
      {/* <RecentIn>
        최근 접속 시간: {recentTime}
        </RecentIn> */}
    </TotalContainer>
  );
}

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
text-white
flex
flex-col
relative
`;

//수정 버튼
const ProfileModButton = tw.button`
absolute
right-0
mb-auto
`;

//수정 버튼 이미지
const ProfileModImg = tw.img`
border
w-7
h-7
mr-2
mt-1
rounded-full
hover:filter
hover:invert
transition duration-300 ease-in-out
`;

//정보 수정 버튼, 접속 시간 제외한 모든 컨테이너
const FullContainer = tw.div`
flex
flex-grow
items-center

`;

//프로필 이미지 보여주는 왼쪽 컨테이너
const LeftContainer = tw.div`
    ml-16
    mr-10
`;

//프로필 이미지
const StyleProfileImg = tw.div`
bg-white
rounded-full
w-36
h-36
relative
bg-cover
bg-center
`;

//프로필 이미지 - hover 했을 때
const StyleProfileImgHover = tw.div`
bg-white
rounded-full
w-36
h-36
bg-cover
bg-center
opacity-80
relative
`;

// hover 했을 때 뜨는 카메라 아이콘
const StyleCarmera = tw.img`
absolute
top-1/2
left-1/2
transform
-gpu
translate-x-[-50%]
translate-y-[-50%]
w-8
h-8
`;

//카메라 클릭 후 나오는 드롭다운
const ProfileDropdown = tw.div`
absolute
text-black
top-[29%]

shadow-lg
z-50
rounded-md
bg-gray-100
text-base
`;

//드롭다운버튼들...
const DropdownButton = tw.div`
rounded-md
w-44
px-4
py-2
transition-colors
hover:bg-gray-300
cursor-pointer
`;

//팔로잉, 팔로우, 닉네임, 메세지, url 들어있는 오른쪽 컨테이너
const RightContainer = tw.div`
flex
flex-col
justify-center

`;

//팔로잉, 팔로우 나타내는 컨테이너
const FollowContainer = tw.div`
flex
space-x-4
`;

//팔로잉
const SytleFollowing = tw.div`
flex
transition-colors
hover:text-blue-500
hover:border-blue-500
`;

//팔로우
const StyleFllower = tw.div`
transition-colors
hover:text-blue-500
hover:border-blue-500
flex`;

//팔로잉, 팔로우 글씨
const FollowText = tw.div`
text-base
mr-2
`;

//팔로잉, 팔로우 숫자
const FollowNumber = tw.div`
font-semibold
text-base
`;

//닉네임
const StyleNickName = tw.div`
font-extrabold
text-3xl
mb-2
`;

const StyleEdit = tw.img`
ml-1
w-4
h-4
hover:filter
hover:invert
transition duration-300 ease-in-out
`;

//메세지
const StyleMessage = tw.div`
text-base
mb-2
`;

//url
const SytleUrl = tw.div`
text-base

`;

//url의 A태그
const StyleA = tw.a`
border-b
transition-colors
hover:text-blue-500
hover:border-blue-500
`;

const NoneText = tw.div`
text-sm
mb-1
text-gray-400
`;

//최근 접속 시간
// const RecentIn = tw.div`
// self-end
// text-sm
// pb-3
// pr-3
// text-[#9E9E9E]
// `;
