import { Keyword } from "./Util";

//어차피 아무 값도 없을 건데 이렇게 굳이 지정할 필요가 있을까?
export interface SearchKeywordParams {}

// export interface SearchKeywordResponse {
//   lst: Keyword[];
// }

export interface KeywordState {
  keywords: Keyword[];
  candidate: string[];
}
