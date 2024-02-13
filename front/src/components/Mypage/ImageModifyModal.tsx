import React, { useState } from "react";
import tw from "tailwind-styled-components";

import { uploadImage, profileModifyImage, profileImageDelete } from "api/image";

import ArrowTop from "assets/img/top-arrow.png";

import { Navigate } from "react-router-dom";

import axios from "axios";

type ModalProps = {
  toggleModal: () => void;
  handleChange: () => void;
  profileImage: string | undefined;
  option: string;
};

function ImageModifyModal(props: ModalProps) {
  const { toggleModal, handleChange, profileImage, option } = props;

  //selectedFile 현재 올린파일
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  //
  const [imagePreview, setImagePreview] = useState<string>("");

  const [isModifyProfileImg, setIsModifyProfileImg] =
    React.useState<boolean>(false);

  const [isClick, setIsClick] = useState<boolean>(false);

  React.useEffect(() => {
    setIsModifyProfileImg(true);
  }, [option]);

  //이미지 올리기
  const submitImage = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      //1메가 아래의 이미지만 업로드하게 하기 - 1메가 이상은 안 보내진다... 왜지?
      if (file.size >= 1 * 1024 * 1024) {
        alert("1mb 이하의 파일만 업로드 가능합니다.");
        e.target.value = null;
      } else {
        //파일 선택시
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  //취소시 창 닫기
  const modalToggleHandler = () => {
    toggleModal();
  };

  //업로드
  const handleUpload = async function () {
    //클릭 했다면
    if (isClick !== true) {
      setIsClick(true);

      if (selectedFile) {
        const prevImageUrl = profileImage;

        try {
          //s3에 업로드
          const formData = new FormData();
          formData.append("profileImageFile", selectedFile);
          const res = await uploadImage(formData);

          try {
            //프로필 수정
            const updateData = { profileImage: res };
            await profileModifyImage(updateData);

            //만약 기본 이미지가 아니면 s3에서도 이미지 삭제 해야 함
            if (prevImageUrl != "default_profile_image_letsgo") {
              await profileImageDelete(prevImageUrl);
            }

            //이미지 업로드 모달창 닫고
            toggleModal();
          } catch {
            //만약 update 할 때 오류가 나면 이미 s3에 올렸던 이미지를 삭제함
            await profileImageDelete(res);
            alert("이미지 수정에 실패했습니다.");
          }
        } catch {
          alert("이미지 업로드에 실패했습니다.");
        }
      } else {
        alert("업로드 할 이미지를 선택해주세요.");
      }

      //마이페이지 useEffect
      handleChange();
      setIsClick(false);
    }
  };

  return (
    <Wrapper>
      <ModalContainer>
        {isModifyProfileImg ? (
          <div className="rounded-lg flex flex-col w-full h-full overflow-auto px-5 items-center py-5 border border-black justify-around ">
            <input
              type="file"
              accept="image/*"
              onChange={submitImage}
              className="text-black p-1 w-3/4"
            />
            {/* 이미지 미리보기 */}
            {imagePreview === "" ? (
              <div className="flex flex-col items-center">
                <img src={ArrowTop} alt="" className="w-15 h-20 mb-3" />
                <p className="text-gray-500 border-b">파일을 선택해주세요</p>
              </div>
            ) : (
              <img
                src={imagePreview}
                alt="프로필 이미지"
                className="rounded-full size-1/2 bg-white border"
              />
            )}

            <div className="w-full flex justify-around py-3">
              <ButtonNO onClick={modalToggleHandler}>취소</ButtonNO>
              <ButtonOK onClick={handleUpload}>확인</ButtonOK>
            </div>
          </div>
        ) : null}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center
`;

const ModalContainer = tw.div`
  rounded-lg
  shadow-md
  w-[350px]
  h-[350px]
  bg-white
`;

const ButtonOK = tw.button`
py-3
px-6
rounded-md
bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800
`;

const ButtonNO = tw.button`
bg-gray-300
py-3
px-6
rounded-md

`;

export default ImageModifyModal;
