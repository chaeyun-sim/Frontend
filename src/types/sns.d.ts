interface IRecentSnsItem {
  title: string;
  content: string;
  comment: string;
  isFollowed: boolean;
}

interface IPostingFollowing {
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
  type: TSnsType; // 추가
}

interface ISnsDetail {
  id: number; // 추가
  writerId: number;
  profileUrl: string;
  nickname: string;
  title: string;
  content: string;
  comment: string;
  isFollowed: boolean;
}

interface IPostCommentReq {
  postId: number;
  content: string;
}
