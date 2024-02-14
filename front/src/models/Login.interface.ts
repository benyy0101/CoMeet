import { SmallRoomdata } from "./Room.interface";

export interface loginState {
  memberId: string;
  nickname: string;
  profileImage: string;
  unreadNoteCount: number;
  joinedRooms: SmallRoomdata[];
}

export interface LoginResponse extends loginState {
  nickname: string;
  profileImage: string;
  jwtToken: JwtToken;
  unreadNoteCount: number;
  joinedRooms: SmallRoomdata[];
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  grantType: string;
}

export interface SignupQuery {
  nickname: string;
  memberId: string;
  password: string;
  email: string;
  name: string;
}

export interface ValidityResponse {
  isValid: boolean;
}

export interface UserState {
  isLoggedIn: boolean;
  user: loginState;
}
