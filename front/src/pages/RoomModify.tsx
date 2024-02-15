import {
  modifyRoom,
  uploadRoomImage,
  deleteRoomImage,
  deleteRoom,
} from "api/Room";
import { ROOM_CONSTRAINTS } from "models/Enums.type";
import { RoomResponse } from "models/Room.interface";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { onChange } from "react-toastify/dist/core/store";
import BasicRoom from "assets/img/basic-room.png";
import { useSelector } from "react-redux";
import { Keyword } from "models/Util";
import { set } from "react-hook-form";

export default function RoomModify() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const roomData: RoomResponse | null = location.state.data;

  const [title, setTitle] = useState<string>(roomData?.title || "");
  const [description, setDescription] = useState<string>(
    roomData?.description || ""
  );
  const [maxPeople, setMaxPeople] = useState<number>(roomData?.capacity || 10);
  const [option, setOption] = useState<ROOM_CONSTRAINTS>(
    roomData?.constraints || "FREE"
  );

  const keywords = useSelector((state: any) => state.keyword.keywords);

  //selectedFile 현재 올린파일
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  //이미지 미리보기 파일
  const [imagePreview, setImagePreview] = useState<string>("");

  //이미지 제거 했는지 확인
  const [isRemoveImg, setIsRemoveImg] = useState<boolean>(false);

  const [selectedKeyword, setSelectedKeyword] = useState<Keyword[]>([]);
  const [modifiedNotice, setModifiedNotice] = useState<string>("");

  //이미지 바뀔 때 미리보기
  const onChangeImage = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      //1메가 아래의 이미지만 업로드하게 하기 - 1메가 이상은 안 보내진다... 왜지?
      if (file.size >= 10 * 1024 * 1024) {
        alert("10mb 이하의 파일만 업로드 가능합니다.");
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
        setIsRemoveImg(false);
      }
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (roomData?.mcount && roomData?.mcount > maxPeople) {
      alert("최소 인원을 현재 인원보다 적게 설정할 수 없습니다.");
    } else {
      e.preventDefault();
      const keywordIds = selectedKeyword.map((keyword: Keyword) => keyword.id);
      const data: any = {
        roomId,
        title,
        description,
        capacity: maxPeople,
        constraints: option,
        keywordIds,
        notice: modifiedNotice,
      };

      if (selectedFile) {
        try {
          if (roomId) {
            const formData = new FormData();
            formData.append("roomImageFile", selectedFile);
            await uploadRoomImage(roomId, formData);

            setIsRemoveImg(false);
            window.location.replace(`room/${roomId}`);
          }
        } catch {
          alert("이미지 업로드에 실패했습니다.");
        }
      } else {
        if (isRemoveImg && imagePreview === "" && roomId) {
          await deleteRoomImage(roomId);
        }
      }

      try {
        await modifyRoom(data);
      } catch {
        alert("방 정보 수정 실패, 다시 시도해주세요.");
      }

      navigate(`/room/${roomId}?modify=true`, { replace: true });
    }
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const maxPeopleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPeople(Number(e.target.value));
  };

  const optionHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value as ROOM_CONSTRAINTS);
  };

  //이미지 제거 버튼 눌렀을 때
  const handleRoomImageRemove = async () => {
    if (roomId) {
      setIsRemoveImg(true);
      setImagePreview("");
      // 선택했다가 지웠을 경우가 있을 수도 있으니
      setSelectedFile(undefined);
    }
  };

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    eliminateRoom();
  };

  const eliminateRoom = async () => {
    if (window.confirm("정말로 방을 삭제하시겠습니까?")) {
      try {
        const res = await deleteRoom({ roomId: parseInt(roomId!) });
      } catch {
        console.error("방 삭제 실패");
      }
    } else {
    }
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newKeyword = keywords?.find(
      (keyword: Keyword) => keyword.name === e.target.value
    );
    if (
      !selectedKeyword.find(
        (keyword: Keyword) => keyword.name === e.target.value
      )
    ) {
      setSelectedKeyword((prev) => [...prev, newKeyword]);
    }
  };

  const dropHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    target: string
  ) => {
    e.preventDefault();
    const dropKeyword = keywords?.find(
      (keyword: Keyword) => keyword.name === target
    );
    setSelectedKeyword(
      selectedKeyword.filter(
        (keyword: Keyword) => keyword.name !== dropKeyword?.name
      )
    );
  };

  return (
    <Wrapper>
      <CreateRoomContainer>
        <TitleContainer>
          <Title>스터디 방 설정</Title>
          <Description>스터디 방의 설정을 변경합니다.</Description>
        </TitleContainer>
        <ThumbLabel htmlFor="file">
          <ThumbContainer>
            <ThumbImg
              id="profile"
              src={
                (roomData?.room_image === "" && imagePreview === "") ||
                isRemoveImg === true
                  ? BasicRoom
                  : imagePreview === ""
                    ? roomData?.room_image
                    : imagePreview
              }
              alt="thumb"
            />
            <ThumbHover>
              <CameraIcon className="w-8 h-8 text-slate-200" />
              <ThumbDescription>사진 변경</ThumbDescription>
            </ThumbHover>
          </ThumbContainer>
        </ThumbLabel>
        {roomData?.room_image || imagePreview ? (
          <ImageRemoveButton onClick={handleRoomImageRemove}>
            이미지 제거
          </ImageRemoveButton>
        ) : null}
        <input
          className="hidden"
          type="file"
          name="file"
          accept="image/*"
          id="file"
          onChange={onChangeImage}
          // @change="onChangeImage"
        />
        <CreateRoomForm onSubmit={submitHandler}>
          <InputUnit className="w-1/2">
            <Label>방 이름 *</Label>
            <TextInput value={title} onChange={titleHandler} />
          </InputUnit>
          <InputUnit>
            <Label>
              방 설명 <LabelSpan>(optional)</LabelSpan>
            </Label>
            <TextInput value={description} onChange={descriptionHandler} />
          </InputUnit>
          <Block />
          <SubTitle>방 제한</SubTitle>
          {roomData?.type === "DISPOSABLE" && (
            <InputUnit className="w-1/3">
              <Label>
                비밀번호 <LabelSpan>(optional)</LabelSpan>
              </Label>
              <TextInput type="password" />
            </InputUnit>
          )}
          <InputUnit>
            <Label>키워드</Label>
            <select
              className="w-40 border-[1px] rounded-md p-2"
              onChange={selectHandler}
            >
              {keywords?.map((keyword: any) => (
                <option key={keyword.keywordId} value={keyword.name}>
                  {keyword.name}
                </option>
              ))}
            </select>
            <KeywordContainer>
              {selectedKeyword.map((keyword: any) => (
                <KeywordToken key={keyword.keywordId}>
                  {keyword.name}
                  <button
                    onClick={(e) => {
                      dropHandler(e, keyword.name);
                    }}
                  >
                    <XMarkIcon className="w-4 h-4 text-red-400"></XMarkIcon>
                  </button>
                </KeywordToken>
              ))}
            </KeywordContainer>
          </InputUnit>
          <Block />
          <SubTitle>방 설정:</SubTitle>
          <OptionContainer>
            <InputUnit className="w-1/3">
              <Label>방 옵션</Label>
              <SelectOption value={option} onChange={optionHandler}>
                <option value="FREE">자유</option>
                <option value="MICOFF">음소거 필수</option>
                <option value="VIDEOON">캠/화면공유 필수</option>
                <option value="VIDEOONMICOFF">
                  캠/화면공유 필수, 음소거 필수
                </option>
              </SelectOption>
            </InputUnit>
            <InputUnit className="w-1/3 justify-around">
              <Label>
                현재 인원: <LabelSpan>{roomData?.mcount}명</LabelSpan>
              </Label>
              <Label>
                최대 인원: <LabelSpan>{maxPeople}명</LabelSpan>
              </Label>
              <input
                type="range"
                id="volume"
                min="1"
                max="30"
                value={maxPeople}
                onChange={maxPeopleHandler}
              />
            </InputUnit>
          </OptionContainer>
          <InputUnit>
            <SubTitle>공지 (1000자 제한)</SubTitle>
            <textarea
              name="notice"
              id="notice"
              className="border-[1px] focus:outline-none p-2 rounded-lg focus:ring-2 focus:ring-purple-900 h-40"
              maxLength={1000}
              value={modifiedNotice}
              onChange={(e) => setModifiedNotice(e.target.value)}
            ></textarea>
          </InputUnit>
          <SubmitButtonContainer>
            <DeleteButton onClick={deleteHandler}>방 삭제하기</DeleteButton>
            <SubmitButton>변경사항 저장</SubmitButton>
          </SubmitButtonContainer>
        </CreateRoomForm>
      </CreateRoomContainer>
    </Wrapper>
  );
}

const KeywordContainer = tw.div`
flex
space-x-2
`;
const KeywordToken = tw.div`
bg-violet-700
p-1
px-2
rounded-md
shadow-md
text-white
text-sm
flex
items-center
justify-between
space-x-2
`;

const Wrapper = tw.div`
flex
flex-col
items-center
w-full
min-h-screen
py-10
`;

const CreateRoomContainer = tw.div`
w-[60rem]
flex
flex-col
space-y-4
`;

const TitleContainer = tw.div`
flex
flex-col
space-y-2
border-b-2
border-slate-900
p-2
`;

const ThumbLabel = tw.label`
px-8
py-4
w-40
`;

const ThumbContainer = tw.div`
w-32
h-32
relative
flex
items-center
justify-center
`;

const ImageRemoveButton = tw.button`
border-gray-300 bg-gray-300 rounded-lg p-1 ml-11 mt-3
w-24
`;

const ThumbImg = tw.img`
absolute
left-0
top-0
cursor-pointer
w-32
h-32
bg-white
border
rounded-full
flex
justify-center
items-center
bg-cover
bg-center
`;

const ThumbHover = tw.div`
cursor-pointer
z-10
opacity-0
hover:opacity-100
bg-black/60
w-32
h-32
flex-col
rounded-full
flex
justify-center
items-center
`;

const ThumbDescription = tw.h4`
text-slate-200
font-semibold
text-sm
`;

const Title = tw.h1`
text-2xl
font-bold
`;

const Description = tw.p`
font-medium
`;

const CreateRoomForm = tw.form`
p-2
flex
flex-col
space-y-2
`;

const InputUnit = tw.div`
w-full
max-h-96
flex
flex-col
space-y-2
justify-center
`;

const Label = tw.label`
text-md
font-semibold
`;

const LabelSpan = tw.span`
text-md
font-medium
`;

const TextInput = tw.input`
text-md
border
h-10
border-slate-300
rounded-lg
focus:outline-none
p-2
focus:ring-2
focus:ring-purple-900
`;

const Block = tw.div`
w-full
h-8
border-b
border-slate-400
`;

const SubTitle = tw.h1`
py-4
text-md
font-semibold
`;

const SelectOption = tw.select`
bg-slate-100
p-2
rounded-lg
border
border-slate-300
focus:outline-none
`;

const SubmitButtonContainer = tw.div`
w-full
h-10
flex
justify-end
py-8
border-t
border-slate-400
space-x-4
`;

const DeleteButton = tw.button`
bg-red-700
p-4
flex
justify-center
items-center
rounded-lg
text-white
font-semibold
shadow-md
`;

const OptionContainer = tw.div`
w-full
flex
justify-around
items-center
pb-6
`;

const SubmitButton = tw.button`
bg-green-700
p-4
flex
justify-center
items-center
rounded-lg
text-white
font-semibold
shadow-md
`;
