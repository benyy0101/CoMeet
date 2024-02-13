import React, { useState, ChangeEvent } from "react";
import tw from "tailwind-styled-components";

const options = [
  {
    value: "EARTH",
    label: "지구",
    description: "내 특성을 설정해주세요!",
  },
  {
    value: "PROBE",
    label: "탐사선",
    description: "새로운 기술을 탐험하는 것을 좋아해요",
  },
  {
    value: "BLACKHOLE",
    label: "블랙홀",
    description: "한 기술에 깊게 몰입하는 것을 좋아해요",
  },
  {
    value: "SUN",
    label: "태양",
    description: "다른 사람들과 함께 스터디를 이끄는 것을 좋아해요.",
  },
  {
    value: "MOON",
    label: "달",
    description: "주도적이지는 않지만 뒤에서 꾸준하고 열심히 스터디에 참여해요",
  },
  {
    value: "GALAXY",
    label: "은하수",
    description: "새로운 사람들을 만나는데 거부감이 없어요",
  },
];

interface props {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string | undefined;
}

export default function FeatureSelect({ handleChange, selectedOption }: props) {
  return (
    <>
      <SelectLabel htmlFor="version">공부 성향</SelectLabel>
      <SelectBox onChange={handleChange} value={selectedOption}>
        {options.map((option) => (
          <Option value={option.value}>{option.label}</Option>
        ))}
      </SelectBox>
      {selectedOption && (
        <Description>
          {
            options.find((option) => option.value === selectedOption)
              ?.description
          }
        </Description>
      )}
    </>
  );
}

const SelectLabel = tw.label`
  before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500
`;

const SelectBox = tw.select`
peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100
`;

const Option = tw.option`
py-2
`;

const Description = tw.p`
text-sm ml-3 mt-1 mb-2 text-blue-500
`;
