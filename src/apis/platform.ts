import { authInstance } from '.';

export const getPlatforms = async () => {
  const response = await authInstance.get(`/platforms`);
  return response.data;
};

export const addPlatform = async ({
  platformId,
  platformProfileUrl,
}: {
  platformId: number;
  platformProfileUrl: string;
}) => {
  const response = await authInstance.post(`/streamer/save/platform`, {
    platformId,
    platformProfileUrl,
  });
  return response.data;
};
