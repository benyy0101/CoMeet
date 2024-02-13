export interface IChannel {
  channelId: number; //필수
  name: string; //필수
}

export interface CreateChannelParams {
  roomId: number; //필수
  name: string; //필수
}

export interface CreateChannelResponse {
  channelId: number; //필수
}
export interface ModifyChannelParams {
  channelId: number; //필수
  name: string; //필수
}

export interface ModifyChannelResponse {}

export interface DeleteChannelParams {
  channelId: number; //필수
}

export interface DeleteChannelResponse {}
