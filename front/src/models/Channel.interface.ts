export interface CreateChannelParams {
  roomId: number; //필수
  name: string; //필수
}

export interface CreateChannelResponse {
  channelId: number; //필수
}
export interface ModifyChannelParams {
  roomId: number; //필수
  name: string; //필수
}

export interface ModifyChannelResponse {}
