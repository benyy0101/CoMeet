import { localAxios } from "./http-commons";

export interface BoardListParams {
  category?: string;
  keyword?: string;
  offset?: number;
}

export const getBoardList = async (props: BoardListParams) => {
  const { category, keyword, offset } = props;
  const response = await localAxios.get(
    `/board?category=${category}&keyword=${keyword}
    `
  );
  console.log(response);

  return response.data; // The token
};
