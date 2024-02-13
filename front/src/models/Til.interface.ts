export interface CreateTilParams {
  context: string;
  date: string; // 무조건 날짜형식 2022-10-11
}

export interface CreateTilResponse {
  tilId: number;
}

export interface SearchTilParams {
  memberId: string;
  year: number;
  month: number;
}

export interface SearchTilContent {
  id: number;
  date: string;
}

export interface SearchTilResponse {
  content: SearchTilContent[];
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

export interface DeletePrams {
  tilId: number;
}
