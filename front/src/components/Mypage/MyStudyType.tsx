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
  const [typeImg, setTypeImg] = useState<string>(Earth);
  useEffect(() => {
    switch (feature) {
      case "EARTH":
        setTypeImg(Earth);
        break;
      case "BLACKHOLE":
        setTypeImg(Blackhole);
        break;
      case "GALAXY":
        setTypeImg(Galaxy);
        break;
      case "PROBE":
        setTypeImg(Probe);
        break;
      case "SUN":
        setTypeImg(Sun);
        break;
      case "MOON":
        setTypeImg(Moon);
        break;
    }
  }, []);
  return (
    <TotalContainer>
      <TitleContainer>공부성향</TitleContainer>
      <ImgContainer>
        <img src={typeImg} alt="공부타입 이미지" className="w-36 h-36" />
      </ImgContainer>
      <div className="text-white text-lg">지구형</div>
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
