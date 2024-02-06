import { imageAxios } from "./http-commons";

export const uploadImage = async (fileImage: File) => {
  const response = await imageAxios.post("/member/image");
  console.log(response.data);

  return response.data;
};
