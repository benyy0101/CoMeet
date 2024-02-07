import TextEditor from "components/TextEditor";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import QueryString from "qs";

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

  return <TextEditor isFree={isFree} isEdit={isEdit} />;
}

export default WriteArticle;
