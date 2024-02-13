import React, { useEffect, useState } from "react";

import Earth from "assets/img/feature-earth.svg";
import Blackhole from "assets/img/feature-blackhole.svg";
import Galaxy from "assets/img/feature-galaxy.svg";
import Probe from "assets/img/feature-probe.svg";
import Sun from "assets/img/feature-sun.svg";
import Moon from "assets/img/feature-moon.svg";

import tw from "tailwind-styled-components";

interface MyStudyTypeProps {
  feature: string | undefined;
}

export const MyStudyType = ({ feature }: MyStudyTypeProps) => {
  const [typeImg, setTypeImg] = useState<string>();
  const [typeCategory, setTypeCategory] = useState<string>();
  const [ex, setEx] = useState<string>();

  useEffect(() => {
    switch (feature) {
      case "EARTH":
        setTypeImg(Earth);
        setTypeCategory("지구");
        setEx("내 특성을 설정해주세요!");
        break;
      case "BLACKHOLE":
        setTypeImg(Blackhole);
        setTypeCategory("블랙홀");
        setEx("한 기술에 깊게 몰입하는 것을 좋아해요");
        break;
      case "GALAXY":
        setTypeImg(Galaxy);
        setTypeCategory("은하수");
        setEx("새로운 사람들을 만나는데 거부감이 없어요");
        break;
      case "PROBE":
        setTypeImg(Probe);
        setTypeCategory("탐사선");
        setEx("새로운 기술을 탐험하는 것을 좋아해요");
        break;
      case "SUN":
        setTypeImg(Sun);
        setTypeCategory("태양");
        setEx(`다른 사람들과 함께 스터디를 \n 이끄는 것을 좋아해요.`);
        break;
      case "MOON":
        setTypeImg(Moon);
        setTypeCategory("달");
        setEx(
          "주도적이지는 않지만 뒤에서 꾸준하고 \n 열심히 스터디에 참여해요"
        );
        break;
    }
  }, [feature]);
  return (
    <TotalContainer>
      <TitleContainer>공부성향</TitleContainer>
      <ImgContainer>
        <img src={typeImg} alt="공부타입 이미지" className="w-36 h-36" />
      </ImgContainer>
      <div className="text-white text-xl font-semibold">{typeCategory}</div>
      <div
        className="text-center text-white my-1"
        style={{ whiteSpace: "pre-line" }}
      >
        {ex}
      </div>
    </TotalContainer>
  );
};

//전체 컨테이너
const TotalContainer = tw.div`
w-full
h-full
flex
flex-col
items-center
py-3
`;

//타이틀 컨테이너
const TitleContainer = tw.div`
text-white
text-xl
font-bold

`;

//이미지 컨테이너
const ImgContainer = tw.div`
text-white
flex-grow
flex
items-center
justify-center
my-2
p-1

rounded-lg
`;
