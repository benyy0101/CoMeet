export interface LoginQuery {
  nickname: string;
  profileImage: string;
  jwtToken: JwtToken;
}

export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  grantType: string;
}
