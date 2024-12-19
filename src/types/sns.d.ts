interface IRecentSnsItem {
  title: string;
  content: string;
  comment: string;
  isFollowed: boolean;
}

interface IProfile {
  broadcasterId: number;
  profileUrl: string;
  nickname: string;
  todaySaying: string;
  recentPostList: IRecentSnsItem[];
}

type TSnsType = 'text' | 'image' | 'video' | 'imagevideo';

interface ISnsItem {
  postId: number;
  title: string;
  hasImage: boolean;
  hasVideo: boolean;
}

interface ISnsDetail {
  postId: number;
  writerId: number;
  title: string;
  content: string;
  profileUrl: string;
  nickname: string;
  comment: string;
  isFollowed: boolean;
}

interface IComment {
  id: number;
  profileUrl: string;
  nickname: string;
  comment: string;
}

interface ILastestSnsItem {
  memberId: number;
  profileUrl: string;
  dailyMessage: string;
  postIdList: number[];
}

interface Member {
  memberId: number;
  nickname: string;
}
