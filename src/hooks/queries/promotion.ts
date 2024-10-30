import { useQuery } from '@tanstack/react-query';

import { getPromotionBanner, getPromotionStreamers } from '@/apis/promotion';

const usePromotionStreamersList = () => {
  return useQuery({
    queryKey: ['streamers'],
    queryFn: getPromotionStreamers,
  });
};

const useGetPromotionBannerData = () => {
  return useQuery({
    queryKey: ['banner-list'],
    queryFn: getPromotionBanner,
  });
};

export { usePromotionStreamersList, useGetPromotionBannerData };
