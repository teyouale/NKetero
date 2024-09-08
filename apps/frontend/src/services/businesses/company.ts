import { BusinessDto } from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { BUSINESS_KEY, COMPANY_KEY } from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';

export const fetchCompany = async (businessId: string) => {
  const response = await axios.get<BusinessDto[], AxiosResponse<BusinessDto[]>>(
    `/business/${businessId}`
  );
  return response.data;
};

export const useCompany = (businessId: string) => {
  const {
    error,
    isPending: loading,
    data: business,
  } = useQuery({
    queryKey: [COMPANY_KEY, businessId],
    queryFn: () => fetchCompany(businessId),
    enabled: !!businessId,
  });

  return { business, loading, error };
};
