import { publicInstance } from '.';

interface StreamerData {
  todayComment: string;
  selfIntroduction: string;
  imageUrl: string;
  interestedList: { isInterested: boolean; name: string }[];
  platformList: { platform: string; imageUrl: string; profileUrl: string }[];
  name: string;
}

export const getPromotionStreamers = async (): Promise<StreamerData[]> => {
  const response = await publicInstance.get('/promotions/streamers');

  if (response.data.code === 'OK') {
    return response.data.data.streamerList;
  }
  return [];
};

interface BannerData {
  url: string;
  bgColor: string;
}

export const getPromotionBanner = async (): Promise<BannerData[]> => {
  const response = await publicInstance.get('/promotions/banners');

  if (response.data.code === 'OK') {
    return response.data.data.bannerList;
  }
  return [];
};
