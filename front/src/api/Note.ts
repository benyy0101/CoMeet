import {
  CreateNoteParams,
  CreateNoteResponse,
  DeleteNoteParams,
  DeleteNoteResponse,
  EnterNoteParams,
  EnterNoteResponse,
  JoinNoteParams,
  JoinNoteResponse,
  SearchNoteParams,
  SearchNoteResponse,
} from "models/Note.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createNote = async (
  params: CreateNoteParams
): Promise<CreateNoteResponse> => {
  const url = `note`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const searchNote = async (
  params: SearchNoteParams
): Promise<SearchNoteResponse> => {
  const url = `note${makeQuerystring(params)}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const enterNote = async (
  params: EnterNoteParams
): Promise<EnterNoteResponse> => {
  const { noteId } = params;
  const url = `note/${noteId}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const joinNote = async (
  params: JoinNoteParams
): Promise<JoinNoteResponse> => {
  const { roomId } = params;
  const url = `note/join-request/${roomId}`;
  const response = await localAxios.post(url);
  return response.data;
};

export const deleteNote = async (
  params: DeleteNoteParams
): Promise<DeleteNoteResponse> => {
  const { noteId } = params;
  const url = `note/${noteId}`;
  const response = await localAxios.delete(url);
  return response.data;
};
