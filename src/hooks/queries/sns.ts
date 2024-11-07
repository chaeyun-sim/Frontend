import { useQuery } from '@tanstack/react-query';

import { getPostingFollowings, getSnsDetail, getSnsList } from '@/apis/sns';

export const useGetSnsList = () => {
  return useQuery({
    queryKey: ['snsList'],
    queryFn: getSnsList,
  });
};

export const useGetSnsDetail = (snsId: number) => {
  return useQuery({
    queryKey: ['snsDetail', snsId],
    queryFn: () => getSnsDetail(snsId),
    enabled: !!snsId,
  });
};

export const useGetPostingFollowings = () => {
  return useQuery({
    queryKey: ['postingFollowings'],
    queryFn: getPostingFollowings,
  });
};
