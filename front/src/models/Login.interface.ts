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