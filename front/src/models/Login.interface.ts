export interface loginState {
  memberId: string;
  nickname: string;
  profileImage: string;
  unreadNoteCount: number;
  joinedRooms: smallRoomdata[];
}

export interface LoginResponse extends loginState {
  nickname: string;
  profileImage: string;
  jwtToken: JwtToken;
  unreadNoteCount: number;
  joinedRooms: smallRoomdata[];
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

export interface smallRoomdata {
  roomId: number;
  title: string;
  roomImage:
    | string
    | "https://cdn1.iconfinder.com/data/icons/line-full-package/150/.svg-15-512.png";
}

export interface UserState {
  isLoggedIn: boolean;
  user: loginState;
}
