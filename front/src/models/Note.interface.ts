import { Pageable, Sort } from "./Util";

export interface CreateNoteParams {
  receiverNickname: string;
  context: string;
}

export interface CreateNoteResponse {
  noteId: number;
}

export interface SearchNoteParams {
  page: number;
  size: number;
}

export interface SearchNoteContent {
  id: number;
  writerId: string;
  writerNickname: string;
  receiverId: string;
  isRead: boolean;
}

export interface SearchNoteResponse {
  content: SearchNoteContent[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface EnterNoteParams {
  noteId: number;
}

export interface EnterNoteResponse {
  id: number;
  writerId: string;
  writerNickname: string;
  receiverId: string;
  context: string;
  isRead: boolean;
  createdAt: string;
}

export interface DeleteNoteParams {
  noteId: number;
}

export interface DeleteNoteResponse {}

export interface JoinNoteParams {
  roomId: number;
}

export interface JoinNoteResponse {}
