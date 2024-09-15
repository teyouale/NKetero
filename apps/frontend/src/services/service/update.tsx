// @ts-nocheck

import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/client/libs/query-client';
import { axios } from '@/client/libs/axios';
import { UpdateBusinessSubcategoriesDto } from '@ketero/dto';
import { MY_CATEGORIES_KEY } from '@/client/constants/query-keys';

export const updateBusinessSubcategories = async (
  data: UpdateBusinessSubcategoriesDto,
) => {
  const response = await axios.patch('/service/bulk', data);
  return response.data;
};

export const useUpdateBusinessSubcategories = () => {
  const {
    mutateAsync: updateBusinessSubcategoriesFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateBusinessSubcategories,
    onSuccess: () => {
      queryClient.invalidateQueries([MY_CATEGORIES_KEY]);
      console.log('Business subcategories updated successfully');
    },
    onError: (error) => {
      console.error('Error updating business subcategories:', error);
    },
  });

  return {
    updateBusinessSubcategories: updateBusinessSubcategoriesFn,
    loading: isPending,
    error,
  };
};
