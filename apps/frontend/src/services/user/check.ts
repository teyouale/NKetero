import { AxiosResponse } from 'axios';
import { axios } from '@/client/libs/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserDto } from '@ketero/dto';

interface UserExistsResponse {
  exists: boolean;
}

export const checkUserByPhoneNumber = async (phoneNumber: string) => {
  const response = await axios.get<UserDto, AxiosResponse<UserDto>>(
    '/user/checkuser',
    {
      params: { phoneNumber },
    }
  );
  return response.data;
};

export const useCheckUserByPhoneNumber = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: checkPhoneNumberFn,
  } = useMutation({
    mutationFn: checkUserByPhoneNumber,
  });
  return { checkUserByPhoneNumber, checkPhoneNumberFn, loading, error };
};
