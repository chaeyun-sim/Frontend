import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addPlatform, getPlatforms } from '@/apis/platform';

export interface Platform {
  id: number;
  name: string;
  imageUrl: string;
  profileUrl: string;
}

export const useGetPlatforms = () => {
  return useQuery<{ data: { platforms: Platform[] } }, Error>({
    queryKey: ['get-platforms'],
    queryFn: getPlatforms,
  });
};

export const useAddPlatform = (memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      platformId,
      platformProfileUrl,
    }: {
      platformId: number;
      platformProfileUrl: string;
    }) => addPlatform({ platformId, platformProfileUrl }),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        queryClient.invalidateQueries({
          queryKey: ['member-summary', memberId],
        });
        queryClient.invalidateQueries({
          queryKey: ['get-platforms'],
        });
      }
    },
    onError: (error) => console.log(error),
  });
};
