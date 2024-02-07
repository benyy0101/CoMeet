import TextEditor from "components/BoardWrite/TextEditor";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import QueryString from "qs";
import tw from "tailwind-styled-components";
function WriteArticle() {
  const location = useLocation();
  const [isFree, setIsFree] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (queryData.type && queryData.type === "recruit") {
      setIsFree(false);
    } else {
      setIsFree(true);
    }

    if (queryData.option && queryData.option === "edit") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [queryData]);

  return (
    <Wrapper>
      <TextEditor isFree={isFree} isEdit={isEdit} />;
    </Wrapper>
  );
}

const Wrapper = tw.div`
w-full
bg-gradient-to-b
min-h-screen
flex
justify-center
items-center
`;
export default WriteArticle;
