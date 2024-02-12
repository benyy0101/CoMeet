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
    setIsFree(queryData!.type === "recruit" ? false : true);
    setIsEdit(queryData!.option === "edit" ? true : false);
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
