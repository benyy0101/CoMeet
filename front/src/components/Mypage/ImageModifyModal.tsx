import React, { useState } from "react";
import tw from "tailwind-styled-components";

import { uploadImage, profileModifyImage, profileImageDelete } from "api/image";

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
    if (selectedFile) {
      // console.log(selectedFile);

      //만약 기본 이미지가 아니면 s3에서도 이미지 삭제 해야 함
      if (profileImage != "default_profile_image_letsgo") {
        console.log(profileImage);
        await profileImageDelete(profileImage);
        console.log("안녕");
      }

      try {
        //s3에 업로드
        const formData = new FormData();
        formData.append("profileImageFile", selectedFile);
        const res = await uploadImage(formData);

        //프로필 수정
        const updateData = { profileImage: res };
        await profileModifyImage(updateData);

        //이미지 업로드 모달창 닫고
        toggleModal();

        //마이페이지 useEffect
        handleChange();
      } catch {
        alert("이미지 업로드에 실패했습니다.");
      }
    } else {
      alert("업로드 할 이미지를 선택해주세요.");
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
              className="py-3 w-3/4"
            />
            {/* 이미지 미리보기 */}
            {imagePreview === "" ? null : (
              <img
                src={imagePreview}
                alt="프로필 이미지"
                className="rounded-full size-1/2 border border-black bg-white"
              />
            )}

            <div className="w-full flex justify-around py-3">
              <button className="bg-black" onClick={modalToggleHandler}>
                취소
              </button>
              <button className="bg-black" onClick={handleUpload}>
                확인
              </button>
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
  bg-gray-500
`;
export default ImageModifyModal;
