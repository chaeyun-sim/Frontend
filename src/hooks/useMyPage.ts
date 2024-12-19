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
  const { data: profileSummary } = useProfileSummary(memberId);
  const { data: profileInfo } = useProfileInfo(memberId);
  const { data: posts } = useGetPosts(memberId);
  const { data: comments } = useGetComments(memberId);
  const { data: followers } = useGetFollowers(memberId);
  const { data: follows } = useGetFollows(memberId);
  console.log(posts);

  return {
    isMyPage,
    profileSummary,
    profileInfo,
    posts,
    comments,
    followers: followers?.followers,
    follows,
  };
};
