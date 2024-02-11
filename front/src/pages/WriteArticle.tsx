import TextEditor from "components/BoardWrite/TextEditor";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import QueryString from "qs";
import tw from "tailwind-styled-components";
function WriteArticle() {
  const location = useLocation();
  const [isFree, setIsFree] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    setIsFree(queryData!.type === "recruit" ? false : true);
    if (queryData.option === "edit") {
      setIsEdit(true);
      const { editId, editTitle, editContent } = location.state;
      setEditId(editId);
      setEditTitle(editTitle);
      setEditContent(editContent);
      console.log("befrore enter", editContent);
    } else {
      setIsEdit(false);
    }
  }, [queryData]);

  return (
    <Wrapper>
      <TextEditor
        isFree={isFree}
        isEdit={isEdit}
        editId={editId}
        editTitle={editTitle}
        editContent={editContent}
      />
      ;
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
