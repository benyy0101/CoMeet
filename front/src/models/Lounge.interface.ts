export interface ILounge {
  loungeId: number; //필수
  name: string; //필수
}

export interface CreateLoungeParams {
  roomId: number; //필수
  name: string; //필수
}

export interface CreateLoungeResponse {
  loungeId: number; //필수
}
export interface ModifyLoungeParams {
  loungeId: number; //필수
  name: string; //필수
}

export interface ModifyLoungeResponse {}

export interface DeleteLoungeParams {
  loungeId: number; //필수
}

export interface DeleteLoungeResponse {}
