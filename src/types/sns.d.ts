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
  nickname: string;
  profileUrl: string;
  content: string;
  comment: string;
}

interface IPostCommentReq {
  postId: number;
  content: string;
}

interface IComment {
  id: number;
  profileUrl: string;
  nickname: string;
  comment: string;
}

interface ILastestSnsItem {
  streamerId: number;
  profileUrl: string;
  dailyMessage: string;
  postIdList: number[];
}
