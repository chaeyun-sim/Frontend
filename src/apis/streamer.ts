import { authInstance } from '.';

export const postDailyMessage = async (data: IPostDailyMessageReq) => {
  const response = await authInstance.post(
    '/streamer/createDailyMessage',
    data
  );
  return response.data;
};
