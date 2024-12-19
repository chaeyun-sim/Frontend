import { authInstance } from '.';

export const getStreamerSnsList = async () => {
  const response = await authInstance.get('/streamer/getPostList');
  return response.data;
};

export const postDailyMessage = async (data: IPostDailyMessageReq) => {
  const response = await authInstance.post(
    '/streamer/createDailyMessage',
    data
  );
  return response.data;
};
