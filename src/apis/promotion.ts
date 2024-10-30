import { publicInstance } from '.';

interface StreamerData {
  imageUrl: string;
  profileUrl: string;
  interestedList: { isInterested: boolean; name: string }[];
  name: string;
}

export const getPromotionStreamers = async (): Promise<StreamerData[]> => {
  const response = await publicInstance.get('/promotions/streamers');

  if (response.data.code === 'OK') {
    return response.data.data.streamerList;
  }
  return [];
};
