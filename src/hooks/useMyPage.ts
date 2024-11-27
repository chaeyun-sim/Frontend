import {
  useGetComments,
  useGetFollowers,
  useGetPosts,
  useIsMyMemberId,
  useProfileSummary,
} from './queries/members';

interface IProps {
  memberId: string;
}

export const useMyPage = ({ memberId }: IProps) => {
  const { data: isMyPage } = useIsMyMemberId(memberId);
  const { data: profileSummary } = useProfileSummary(memberId, isMyPage);
  const { data: posts } = useGetPosts(memberId, isMyPage);
  const { data: comments } = useGetComments(memberId, isMyPage);
  const { data: followers } = useGetFollowers(memberId, isMyPage);

  return { isMyPage: true, profileSummary, posts, comments, followers };
};
