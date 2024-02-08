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
