import {
  useGetComments,
  useGetFollowers,
  useGetFollows,
  useGetPosts,
  useIsMyMemberId,
  useProfileInfo,
  useProfileSummary,
} from './queries/members';

interface IProps {
  memberId: string;
}

export const useMyPage = ({ memberId }: IProps) => {
  const { data: isMyPage } = useIsMyMemberId(memberId);
  const { data: profileSummary } = useProfileSummary(memberId, isMyPage);
  const { data: profileInfo } = useProfileInfo(memberId, isMyPage);
  const { data: posts } = useGetPosts(memberId, isMyPage);
  const { data: comments } = useGetComments(memberId, isMyPage);
  const { data: followers } = useGetFollowers(memberId, isMyPage);
  const { data: follows } = useGetFollows(memberId, isMyPage);

  return {
    isMyPage,
    profileSummary,
    profileInfo,
    posts,
    comments,
    followers,
    follows,
  };
};
