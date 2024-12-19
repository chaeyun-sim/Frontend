import { useMutation, useQuery } from '@tanstack/react-query';

import {
  checkIdMatch,
  getComments,
  getFollowers,
  getFollows,
  getPostList,
  getProfileInfo,
  getProfileSummary,
  postFollow,
} from '@/apis/member';

export interface Platform {
  platform: string;
  imageUrl: string;
  profileUrl: string;
}

export interface ProfileSummary {
  followerCount: number;
  followingCount: number;
  postCount: number;
  isStreamer: boolean;
  isSubmittedToStreamer: boolean;
  platforms: Platform[];
}

export const useProfileSummary = (memberId: string) => {
  return useQuery<ProfileSummary>({
    queryKey: ['member-summary', memberId],
    queryFn: () => getProfileSummary(memberId),
  });
};

export interface ProfileInfo {
  imageUrl: string;
  nickname: string;
  isFollowing: boolean;
  selfIntroduction: string;
  tags: string[];
}

export const useProfileInfo = (memberId: string) => {
  return useQuery<ProfileInfo>({
    queryKey: ['profile-info', memberId],
    queryFn: () => getProfileInfo(memberId),
  });
};

export const useIsMyMemberId = (memberId: string) => {
  return useQuery({
    queryKey: ['check-my-member-id', memberId],
    queryFn: () => checkIdMatch(memberId),
  });
};

interface Follower {
  memberId: number;
  name: string;
  imageUrl: string;
}

export const useGetFollowers = (memberId: string) => {
  return useQuery<{ followers: Follower[] }>({
    queryKey: ['get-followers', memberId],
    queryFn: () => getFollowers(memberId),
  });
};

export const useGetFollows = (memberId: string) => {
  return useQuery({
    queryKey: ['ge-follows, memberId'],
    queryFn: () => getFollows(memberId),
  });
};

export interface PostInfo {
  postId: number;
  isPinned: boolean;
  title: string;
  content: string;
  createdDate: string;
  hasImage: boolean;
  hasVideo: boolean;
}

export const useGetPosts = (memberId: string) => {
  return useQuery<PostInfo[]>({
    queryKey: ['get-posts', memberId],
    queryFn: () => getPostList(memberId),
  });
};

export interface CommentInfo {
  commentId: number;
  content: string;
  replyCommentId: number;
  replyContent: string;
}

export const useGetComments = (memberId: string) => {
  return useQuery<{ comments: CommentInfo[] }>({
    queryKey: ['get-comments', memberId],
    queryFn: () => getComments(memberId),
  });
};

interface IPostFollowProps {
  successCallback: (data: IRes<null>) => void;
}

export const usePostFollow = ({ successCallback }: IPostFollowProps) => {
  return useMutation({
    mutationFn: postFollow,
    onSuccess: successCallback,
  });
};
