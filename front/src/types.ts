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

export type BoardListProps = {
  id: number;
  title: string;
  writerNicname: string;
  writerImage: string;
  createdAt: string;
  likeCount: number;
  category: string;
  type: string;
  roomKeywords: string;
  roomImage: string;
  isValid: boolean;
  roomCapacity: number;
};
