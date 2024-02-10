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
export type FREE_BOARD_CATEGORY = "CHAT" | "TIP" | "QUESTION" | "PROMOTION" | "POPULAR" | null;

/**
 * 모집글 완료됐는지.
 */
export type RECRUIT_BOARD_CATEGORY = "ON" | "OFF";

/**
 * 게시판 정렬 방식. 최신순, 좋아요 순, 모집률 순
 * RECRUIT는 모집글에서만 가능
 */
export type BOARD_SORTBY = "LATEST" | "LIKES" | "RECRUIT";

/**
 * EARTH("지구", "내 특성을 설정해주세요!"),
 *PROBE("탐사선", "새로운 기술을 탐험하는 것을 좋아해요"),
 *BLACKHOLE("블랙홀", "한 기술에 깊게 몰입하는 것을 좋아해요"),
 *SUN("태양", "다른 사람들과 함께 스터디를 이끄는 것을 좋아해요."),
 *MOON("달", "주도적이지는 않지만 뒤에서 꾸준하고 열심히 스터디에 참여해요"),
 *GALAXY("은하수", "새로운 사람들을 만나는데 거부감이 없어요");ee
 */
export type MEMEBER_FEATURE = "EARTH" | "PROBE" | "BLACKHOLE" | "SUN" | "MOON" | "GALAXY";
