import React, { useState } from "react";
import tw from "tailwind-styled-components";

export const KeywordSearchBox = () => {
  //임시 키워드 데이터
  const keywordArr: string[] = [
    "REACT",
    "PYTHON",
    "C++",
    "C",
    "JAVA",
    "HTML",
    "CSS",
  ];

  //키워드 선택된 애들 배열
  const [keywordSearchArr, setKeywordSearchArr] = useState<string[]>([]);

  return (
    <TotalContainer>
      <div>키워드 검색</div>
      <div>드롭박스에서 클릭하면 위로 올라오는 곳</div>
      <div>
        <input
          className="text-black"
          list="browsers"
          id="myBrowser"
          name="myBrowser"
        />
        <datalist id="browsers">
          <option value="Chrome"></option>
          <option value="Firefox"></option>
          <option value="Internet Explorer"></option>
          <option value="Opera"></option>
          <option value="Safari"></option>
          <option value="Microsoft Edge"></option>
        </datalist>
      </div>
      <div>이 밑에 드롭박스</div>
    </TotalContainer>
  );
};

const TotalContainer = tw.div`
border
w-3/4
mx-auto

`;
