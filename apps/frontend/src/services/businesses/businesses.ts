import { BusinessDto } from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { BUSINESS_KEY } from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';

export const fetchBusiness = async () => {
  const response = await axios.get<BusinessDto[], AxiosResponse<BusinessDto[]>>(
    '/business'
  );
  return response.data;
};

export const useBusiness = () => {
  const {
    error,
    isPending: loading,
    data: business,
  } = useQuery({
    queryKey: BUSINESS_KEY,
    queryFn: fetchBusiness,
  });

  return { business, loading, error };
};
