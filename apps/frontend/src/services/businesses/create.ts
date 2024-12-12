import { CreateBusinessUserDto, BusinessDto } from '@ketero/dto';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axios } from '@/client/libs/axios';
import { queryClient } from '@/client/libs/query-client';
import { BUSINESS_KEY, COMPANY_KEY } from '@/client/constants/query-keys';

export const createCompany = async (data: CreateBusinessUserDto) => {
  const response = await axios.post<
    BusinessDto,
    AxiosResponse<BusinessDto>,
    CreateBusinessUserDto
  >('/business', data);

  return response.data;
};

export const useCreateBusiness = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createComanyFn,
  } = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      queryClient.setQueryData<BusinessDto>(
        [COMPANY_KEY, { id: data.id }],
        data
      );

      queryClient.setQueryData<BusinessDto[]>(BUSINESS_KEY, (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });
  return { createBusiness: createComanyFn, loading, error };
};
