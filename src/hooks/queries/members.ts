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

export const useProfileSummary = (memberId: string, isValid: boolean) => {
  return useQuery<ProfileSummary>({
    queryKey: ['member-summary', memberId],
    queryFn: () => getProfileSummary(memberId),
    enabled: !!isValid,
  });
};

export interface ProfileInfo {
  imageUrl: string;
  nickName: string;
  isFollowing: boolean;
  selfIntroduction: string;
  interests: string[];
}

export const useProfileInfo = (memberId: string, isValid: boolean) => {
  return useQuery<ProfileInfo>({
    queryKey: ['profile-info', memberId],
    queryFn: () => getProfileInfo(memberId),
    enabled: !!isValid,
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

export const useGetFollowers = (memberId: string, isValid: boolean) => {
  return useQuery<{ followers: Follower[] }>({
    queryKey: ['get-followers', memberId],
    queryFn: () => getFollowers(memberId),
    enabled: !!isValid,
  });
};

export const useGetFollows = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['ge-follows, memberId'],
    queryFn: () => getFollows(memberId),
    enabled: !!isValid,
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

export const useGetPosts = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['get-posts', memberId],
    queryFn: () => getPostList(memberId),
    enabled: !!isValid,
  });
};

export interface CommentInfo {
  commentId: number;
  content: string;
  replyCommentId: number;
  replyContent: string;
}

export const useGetComments = (memberId: string, isValid: boolean) => {
  return useQuery<{ comments: CommentInfo[] }>({
    queryKey: ['get-comments', memberId],
    queryFn: () => getComments(memberId),
    enabled: !!isValid,
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
