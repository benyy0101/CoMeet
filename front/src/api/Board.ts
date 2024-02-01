import axios from "axios";
import api from "./auth";

type BoardListParams = {
  category: string | null;
  keyword: string | null;
  offset: number | null;
};

export const getBoardList = async (props: BoardListParams) => {
  const { category, keyword, offset } = props;
  const response = await api.get(
    `/board?category=${category}&keyword=${keyword}
    `
  );

  return response.data; // The token
};
