import { ProfileUpdateRequest } from '@/apis/member';

import {
  useGetComments,
  useGetFollowers,
  useGetFollows,
  useGetPosts,
  useProfileInfo,
  useProfileSummary,
  usePromoteStreamer,
  useToggleFollow,
  useUpdateProfileInfo,
} from './queries/members';

interface IProps {
  memberId: string;
}

export const useMyPage = ({ memberId }: IProps) => {
  const { data: profileSummary } = useProfileSummary(memberId);
  const { data: profileInfo } = useProfileInfo(memberId);
  const { data: posts } = useGetPosts(memberId);
  const { data: comments } = useGetComments(memberId);
  const { data: followers } = useGetFollowers(memberId);
  const { data: follows } = useGetFollows(memberId);
  const { mutate: requestUpdate } = usePromoteStreamer(memberId);
  const { mutate: updateProfile } = useUpdateProfileInfo(memberId);
  const { mutate: toggleFollow } = useToggleFollow(memberId);

  const handleUpdateProfile = ({
    data,
    successHandler,
  }: {
    data: FormData;
    successHandler: () => void;
  }) => {
    updateProfile(
      { data },
      {
        onSuccess: successHandler,
      }
    );
  };

  return {
    profileSummary,
    profileInfo,
    posts: posts?.postInfos,
    comments: comments?.comments,
    followers: followers?.followers,
    follows: follows?.follows,
    requestUpdate,
    updateProfile: handleUpdateProfile,
    toggleFollow,
  };
};
