import { imageAxios } from "./http-commons";
import { localAxios } from "./http-commons";

export const uploadImage = async (fileImage: FormData) => {
  const response = await imageAxios.post("/member/image", fileImage);

  return response.data;
};

export const profileImageDelete = async () => {
  const response = await localAxios.delete("/member/image");
};
