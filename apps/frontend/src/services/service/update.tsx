// @ts-nocheck
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/client/libs/query-client';
import { axios } from '@/client/libs/axios';
import { UpdateBusinessSubcategoriesDto } from '@ketero/dto';
import { MY_CATEGORIES_KEY } from '@/client/constants/query-keys';
import { toast } from '@ketero/ui';

export const updateBusinessSubcategories = async (
  data: UpdateBusinessSubcategoriesDto,
  businessID: string
) => {
  const response = await axios.patch(`/service/bulk/${businessID}`, data);
  console.log(response);
  return response.data;
};

export const useUpdateBusinessSubcategories = () => {
  const {
    mutateAsync: updateBusinessSubcategoriesFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ data, businessID }) =>
      updateBusinessSubcategories(data, businessID),
    onSuccess: (data) => {
      toast({
        title: 'Selected Categories Updated',
        description: (
          <>
            All selected categories have been successfully updated on the
            server.
            <br />
            {/* <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre> */}
          </>
        ),
        variant: 'success',
      });
      console.log(data);
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
