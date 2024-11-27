import { useQuery } from '@tanstack/react-query';

import {
  checkIdMatch,
  getComments,
  getFollowers,
  getPostList,
  getProfileInfo,
  getProfileSummary,
} from '@/apis/member';

export const useProfileSummary = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['member-summary', memberId],
    queryFn: () => getProfileSummary(memberId),
    enabled: !!isValid,
  });
};

export const useProfileInfo = (memberId: string, isValid: boolean) => {
  return useQuery({
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

export const useGetFollowers = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['get-followers', memberId],
    queryFn: () => getFollowers(memberId),
    enabled: !!isValid,
  });
};

export const useGetPosts = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['get-posts', memberId],
    queryFn: () => getPostList(memberId),
    enabled: !!isValid,
  });
};

export const useGetComments = (memberId: string, isValid: boolean) => {
  return useQuery({
    queryKey: ['get-comments', memberId],
    queryFn: () => getComments(memberId),
    enabled: !!isValid,
  });
};
