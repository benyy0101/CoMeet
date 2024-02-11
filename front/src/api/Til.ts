import {
  CreateTilParams,
  CreateTilResponse,
  EnterTilParams,
  EnterTilResponse,
  ModifyTilParams,
  ModifyTilResponse,
  SearchTilParams,
  SearchTilResponse,
  DeletePrams,
} from "models/Til.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createTil = async (
  params: CreateTilParams
): Promise<CreateTilResponse> => {
  const url = `til`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const searchTil = async (
  params: SearchTilParams
): Promise<SearchTilResponse> => {
  const { memberId, month, year } = params;
  const url = `til/list/${memberId}${makeQuerystring({ year, month })}`;
  console.log(url);
  const response = await localAxios.get(url);
  return response.data;
};

export const modifyTil = async (
  params: ModifyTilParams
): Promise<ModifyTilResponse> => {
  const { tilId } = params;
  const url = `til/${tilId}`;
  const response = await localAxios.patch(url, params);
  return response.data;
};

export const enterTil = async (
  params: EnterTilParams
): Promise<EnterTilResponse> => {
  const { tilId } = params;
  const url = `til/${tilId}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const deleteTil = async (params: DeletePrams) => {
  const { tilId } = params;
  const url = `til/${tilId}`;
  const response = await localAxios.delete(url);
};
