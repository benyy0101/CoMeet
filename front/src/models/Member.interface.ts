export interface MemberQuery {
  memberId: String;
  name: String;
  nickname: String;
  link: String;
  profileImage: String;
  email: String;
  description: String;
  feature: String;
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
  mostStudyTime: String;
  keywords: [
    {
      name: String;
      weight: number;
    },
  ];
}
