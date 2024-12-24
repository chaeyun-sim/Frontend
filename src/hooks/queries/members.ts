import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  addWallpapaer,
  checkIdMatch,
  deleteWallpaper,
  getComments,
  getFollowers,
  getFollows,
  getPostList,
  getProfileInfo,
  getProfileSummary,
  getTags,
  postFollow,
  ProfileUpdateRequest,
  promoteStreamer,
  toggleFollow,
  updateMemberInfo,
} from '@/apis/member';

export interface Platform {
  id: number;
  imageUrl: string;
  name: string;
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
    enabled: !!memberId,
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
    enabled: !!memberId,
  });
};

export const useIsMyMemberId = (memberId: string) => {
  return useQuery({
    queryKey: ['check-my-member-id', memberId],
    queryFn: () => checkIdMatch(memberId),
    enabled: !!memberId,
  });
};

export interface Follower {
  memberId: number;
  nickname: string;
  profile: string;
}

export const useGetFollowers = (memberId: string) => {
  return useQuery<{ followers: Follower[] }>({
    queryKey: ['get-followers', memberId],
    queryFn: () => getFollowers(memberId),
    enabled: !!memberId,
  });
};

export const useGetFollows = (memberId: string) => {
  return useQuery({
    queryKey: ['ge-follows, memberId'],
    queryFn: () => getFollows(memberId),
    enabled: !!memberId,
  });
};

export interface PostInfo {
  postId: number;
  isPinned: boolean;
  title: string;
  createdDate: string;
  hasImage: boolean;
  hasVideo: boolean;
}

export const useGetPosts = (memberId: string) => {
  return useQuery<{ postInfos: PostInfo[] }>({
    queryKey: ['get-posts', memberId],
    queryFn: () => getPostList(memberId),
    enabled: !!memberId,
  });
};

interface ReCommentInfo {
  commentId: number;
  content: string;
  replyCommentId: number;
  replyContent: string;
}

interface CommentInfo {
  hasImage: boolean;
  hasVideo: boolean;
  memberId: number;
  memberImageUrl: string;
  memberName: string;
  postId: number;
  title: string;
}

export interface Comment {
  commentInfo: ReCommentInfo;
  postInfo: CommentInfo;
}

export const useGetComments = (memberId: string) => {
  return useQuery<{
    comments: Comment[];
  }>({
    queryKey: ['get-comments', memberId],
    queryFn: () => getComments(memberId),
    enabled: !!memberId,
  });
};

interface IPostFollowProps {
  getSnsDetail: () => void;
}

export const usePostFollow = ({ getSnsDetail }: IPostFollowProps) => {
  return useMutation({
    mutationFn: postFollow,
    onSuccess: ({ code }: IRes<null>) => {
      if (code === 'OK') {
        getSnsDetail();
      }
    },
  });
};

export const usePromoteStreamer = (memberId: string) => {
  return useMutation({
    mutationFn: ({ platformUrl }: { platformUrl: string }) =>
      promoteStreamer(platformUrl),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        const queryClient = new QueryClient();
        queryClient.invalidateQueries({
          queryKey: ['member-summary', memberId],
        });
      }
    },
  });
};

export interface UpdateRequest {
  file: string;
  body: ProfileUpdateRequest;
}

export const useUpdateProfileInfo = (memberId: string) => {
  return useMutation({
    mutationFn: ({ data }: { data: FormData }) => updateMemberInfo({ data }),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        const queryClient = new QueryClient();
        queryClient.invalidateQueries({
          queryKey: ['profile-info', memberId],
        });
      }
    },
    onError: (error) => console.log(error),
  });
};

export const useToggleFollow = (memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isFollow }: { isFollow: boolean }) =>
      toggleFollow({ memberId: Number(memberId), isFollow }),
    onMutate: async ({ isFollow }) => {
      const previousProfileInfo = queryClient.getQueryData([
        'profile-info',
        memberId,
      ]);

      queryClient.setQueryData(
        ['profile-info', memberId],
        (old: ProfileInfo | undefined) => {
          if (!old) return old;
          return { ...old, isFollowing: isFollow };
        }
      );

      return { previousProfileInfo };
    },
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        queryClient.invalidateQueries({
          queryKey: ['profile-info', memberId],
        });
        queryClient.invalidateQueries({
          queryKey: ['member-summary', memberId],
        });
      }
    },
  });
};

export const useGetTagDropdown = (keyword: string) => {
  return useQuery<{ data: { tagList: string[] } }>({
    queryKey: ['get-tags', keyword],
    queryFn: () => getTags(keyword),
  });
};

export const useAddWallpaper = () => {
  return useMutation({
    mutationFn: ({ file }: { file: File }) => addWallpapaer(file),
  });
};

export const useDeleteWallpaper = () => {
  return useMutation({
    mutationFn: deleteWallpaper,
  });
};
