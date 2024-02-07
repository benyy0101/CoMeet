import { Pageable, Sort } from "./Util";

export interface CreateNoteParams {
  receiverId: string;
  context: string;
}

export interface CreateNoteResponse {
  noteId: number;
}

export interface SearchNoteParams {}

export interface SearchNoteContent {
  id: number;
  writerId: string;
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

export interface ModifyTilParams {
  tilId: number;
  context: string;
}

export interface ModifyTilResponse {}

export interface EnterTilParams {
  tilId: number;
}

export interface EnterTilResponse {
  id: number;
  memberId: string;
  context: string;
  date: string;
}
