import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import Video from "../assets/img/video.png";
import Audio from "../assets/img/audio.png";
import Lock from "../assets/img/lock.png";

const Wrapper = tw.div`
absolute
bg-gray-200
left-5
rounded-md
shadow-md
`;

const Form = tw.form`
flex
flex-col
divide-y
divide-slate-400

`;

const Img = tw.img`
w-5
`;

const CheckBox = tw.div`
flex
gap-1
`;

const CheckBoxContainer = tw.div`
p-5
flex
flex-col
gap-3
`;

const RangeContainer = tw.div`
flex
gap-2
`;
const CheckBoxOption = tw.div`
flex
gap-3
`;
const Title = tw.div`
font-bold
`;

const RangeWrapper = tw.div`
p-5
`;
function FilterMenu() {
  const [isLocked, setIsLocked] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = React.useState<boolean>(false);
  const [maxcount, setMaxcount] = React.useState<number>(0);
  const maxcountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxcount(Number(e.target.value));
  };
  useEffect(() => {
    console.log(maxcount);
  }, [maxcount]);
  return (
    <Wrapper>
      <Form>
        <CheckBoxContainer>
          <Title>방 기본 설정</Title>
          {/* TODO: 체크박스 커스텀하기 */}
          <CheckBoxOption>
            <CheckBox>
              <Img src={Lock} alt="" />
              <input
                type="checkbox"
                checked={isLocked}
                onChange={() => setIsLocked(!isLocked)}
              />
            </CheckBox>
            <CheckBox>
              <Img src={Audio} alt="" />
              <input
                type="checkbox"
                checked={isMuted}
                onChange={() => setIsMuted(!isMuted)}
              />
            </CheckBox>
            <CheckBox>
              <Img src={Video} alt="" />
              <input
                type="checkbox"
                checked={isVideoOff}
                onChange={() => setIsVideoOff(!isVideoOff)}
              />
            </CheckBox>
          </CheckBoxOption>
        </CheckBoxContainer>

        <RangeWrapper>
          <Title>최대인원 설정</Title>
          <RangeContainer>
            <input type="range" onChange={maxcountHandler} />
            {maxcount}
          </RangeContainer>
        </RangeWrapper>
      </Form>
    </Wrapper>
  );
}

export default FilterMenu;
