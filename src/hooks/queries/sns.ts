/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';

import { createPost, ICreatePost } from '@/apis/sns';

export const useCreatePost = ({
  successCallback,
}: {
  successCallback: (data: IRes<any>) => void;
}) => {
  return useMutation({
    mutationFn: async (props: ICreatePost) => await createPost(props),
    onSuccess: successCallback,
  });
};
