/**
 * 방을 만들 때의 제약조건
 */
export type ROOM_CONSTRAINTS = "VIDEOONMICOFF" | "VIDEOON" | "MICOFF" | "FREE";
/**
 * 방의 타입. 일회용, 영구용
 */
export type ROOM_TYPE = "DISPOSABLE" | "PERMANENT";
/**
 * 방 정렬 방식. CURRENT_PEOPLE은 아직 구현 안 됨
 */
export type ROOM_SORTBY = "LATEST" | "OLDEST" | "CURRENT_PEOPLE";

/**
 * 게시판 기본 타입. 자유글, 모집글
 */
export type BOARD_TYPE = "FREE" | "RECRUIT";

/**
 * 자유게시판 카테고리. 잡담, 팁, 질문, 홍보, 인기
 */
export type BOARD_CATEGORY = "CHAT" | "TIP" | "QUESTION" | "PROMOTION" | "POPULAR";

/**
 * 게시판 정렬 방식. 최신순, 좋아요 순, 모집률 순
 * RECRUIT는 모집글에서만 가능
 */
export type BOARD_SORTBY = "LATEST" | "LIKES" | "RECRUIT";

/**
 * 모집글 완료됐는지.
 */
export type BOARD_IS_RECRUITING = "ON" | "OFF";
