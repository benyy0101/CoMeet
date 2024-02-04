// 방을 만들 때의 제약조건
export type ROOM_CONSTRAINTS = "VIDEOONMICOFF" | "VIDEOON" | "MICOFF" | "FREE";
// 방의 타입. 일회용, 영구용
export type ROOM_TYPE = "DISPOSABLE" | "PERMANENT";
// 방 정렬 방식. CURRENT_PEOPLE은 아직 구현 안 됨
export type ROOM_SORTBY = "LATEST" | "OLDEST" | "CURRENT_PEOPLE";
