import React from "react";
import tw from "tailwind-styled-components";

export const KeywordComponent: React.FC<{ keyword: number }> = (props) => {
  return <KeywordContainer>키워드입니당{props.keyword}</KeywordContainer>;
};

const KeywordContainer = tw.div`
mr-5
`;
