import React, { useState } from "react";
import tw from "tailwind-styled-components";

import { uploadImage } from "api/image";

type ModalProps = {
  toggleModal: () => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  option: string;
};

function ImageModifyModal(props: ModalProps) {
  const { toggleModal, imageUrl, setImageUrl, option } = props;

  //selectedFile 현재 올린파일
  const [selectedFile, setSelectedFile] = useState<File | null>();
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
      //3메가 아래의 이미지만 업로드하게 하기 - s3 과금 피하기
      if (file.size >= 3 * 1024 * 1024) {
        alert("3mb 이하의 파일만 업로드 가능합니다.");
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
      //axios 해야 함
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
