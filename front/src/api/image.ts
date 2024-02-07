import { imageAxios } from "./http-commons";

export const uploadImage = async (fileImage: File) => {
  const response = await imageAxios.post("/member/image", fileImage);

  return response.data;
};
