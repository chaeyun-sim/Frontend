import { useQuery } from '@tanstack/react-query';

import { getPromotionStreamers } from '@/apis/promotion';

const usePromotionStreamersList = () => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: getPromotionStreamers,
  });
};

export { usePromotionStreamersList };
