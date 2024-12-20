import { useAddPlatform, useGetPlatforms } from './queries/platforms';

export const usePlatform = (memberId: string) => {
  const { data: platformList } = useGetPlatforms();
  const { mutate: addPlatform } = useAddPlatform(memberId);

  return {
    platformList: platformList?.data?.platforms ?? [],
    addPlatform,
  };
};
