export type RoomItemProps = {
  title: string;
  roomId: string;
  managerId: string;
  description: string;
  url: string;
  roomImage: string;
  maxcount: number;
  isLocked: boolean;
  password: string;
  constraint: string;
};

export type UserState = {
  user: {
    memberId: string;
    name: string;
    password: string;
    email: string;
    nickname: string;
  };
  isLoggedIn: boolean;
};
