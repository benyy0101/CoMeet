import {
  SearchKeywordParams,
  // SearchKeywordResponse,
} from "models/Keyword.interface";
import { localAxios } from "./http-commons";
import { Keyword } from "models/Util";

export const searchKeyword = async (params: SearchKeywordParams): Promise<Keyword[]> => {
  const url = `keyword`;
  const response = await localAxios.get(url, params);

  return response.data; // The token
};

// export const modifyRoom = async (params: ModifyRoomParams) => {
//   const { roomId, title, description, capacity, notice, password, constraints, keywordIds } =
//     params;
//   const url = `room/${roomId}`;
//   const body = {
//     title,
//     description,
//     capacity,
//     notice,
//     password,
//     constraints,
//     keywordIds,
//   };
//   //roomId가 같이 바디에 들어가도 문제가 안 생긴다
//   const response = await localAxios.patch(url, params);

//   return response.data; // The token
// };
