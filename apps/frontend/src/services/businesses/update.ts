import { CreateBusinessUserDto, BusinessDto } from '@ketero/dto';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axios } from '@/client/libs/axios';
import { queryClient } from '@/client/libs/query-client';
import { BUSINESS_KEY, COMPANY_KEY } from '@/client/constants/query-keys';

export const updateCompany = async (data: CreateBusinessUserDto) => {
  const response = await axios.put<
    BusinessDto,
    AxiosResponse<BusinessDto>,
    CreateBusinessUserDto
  >('/business', data);
  return response.data;
};

export const useUpdateBusiness = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateComanyFn,
  } = useMutation({
    mutationFn: updateCompany,
    onSuccess: (data: BusinessDto) => {
      queryClient.setQueryData<BusinessDto>(
        [COMPANY_KEY, { id: data.id }],
        data
      );

      queryClient.setQueryData<BusinessDto[]>(BUSINESS_KEY, (cache) => {
        if (!cache) return [data];
        return cache.map((item) =>
          item.id === data.id ? data : item
        );
      });
    },
  });
  return { updateBusiness: updateComanyFn, loading, error };
};
