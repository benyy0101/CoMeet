import { imageAxios } from "./http-commons";
import { localAxios } from "./http-commons";

export const uploadImage = async (fileImage: FormData) => {
  const response = await imageAxios.post("/member/image", fileImage);

  return response.data;
};

export const profileModifyImage = async (updateData: object) => {
  const response = await localAxios.patch("/member", updateData);
};

export const profileImageDelete = async (url: string | undefined) => {
  if (url != undefined) {
    const encodedUrl = "/member/image?profileImageUrl=" + url;
    const response = await localAxios.delete(encodedUrl);
  }
};
