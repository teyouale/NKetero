import { BusinessSubcategoryDto, CategoryDto } from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { BUSINESS_KEY, CATEGORIES_KEY } from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';
import { fetchBusiness } from '../businesses/businesses';

export const fetchCategories = async () => {
  const response = await axios.get<CategoryDto[], AxiosResponse<CategoryDto[]>>(
    '/categories/main'
  );
  return response.data;
};

export const fetchBusinessSubcategories = async (businessId: string) => {
  const response = await axios.get<
    BusinessSubcategoryDto[],
    AxiosResponse<BusinessSubcategoryDto[]>
  >(`/service/business/${businessId}`);
  return response.data;
};
export const useCategories = () => {
  const {
    error,
    isPending: loading,
    data: catagories,
  } = useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: fetchCategories,
  });

  return { catagories, loading, error };
};
