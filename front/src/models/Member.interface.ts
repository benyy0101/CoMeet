export interface MemberQuery {
  memberId: string;
  name: string;
  nickname: string;
  link: string;
  profileImage: string;
  email: string;
  description: string;
  feature: string;
  followingCount: number;
  followerCount: number;
  tils: [
    {
      id: number;
      date: string;
    },
  ];
  dayStudyHour: number;
  weekStudyHour: number;
  monthStudyHour: number;
  mostStudyTime: string;
  keywords: [
    {
      name: string;
      weight: number;
    },
  ];
}

export interface MemberUpdateParams {
  name: string;
  password: string;
  nickname: string;
  link: string;
  email: string;
  description: string;
  feature: string;
}

export interface NicknameCheckParams {
  nickname: string;
}

export interface EmailCheckParams {
  email: string;
}
