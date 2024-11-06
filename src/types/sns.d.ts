interface IPostingFollowing {
  id: number;
  profile: string;
  todayWords?: string;
  isViewed?: boolean;
}

type TSnsType = 'text' | 'image' | 'video' | 'imagevideo';

interface ISnsItem {
  id: number;
  title: string;
  type: TSnsType;
}

interface ISns {
  id: number;
  writerId: number;
  profileUrl: string;
  nickname: string;
  title: string;
  content: string;
  comment: string;
  isFollowed: boolean;
}
