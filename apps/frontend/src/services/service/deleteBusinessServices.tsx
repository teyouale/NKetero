import { useMutation } from '@tanstack/react-query';
import { toast } from '@ketero/ui';
import { axios } from '@/client/libs/axios';

export const deleteBusinessSubcategory = async (
  businessID: string,
  id: number
) => {
  console.log(businessID);
  console.log(id);
  await axios.delete(`/service/${businessID}/${id}`);
};

export const useDeleteBusinessSubcategory = () => {
  const mutation = useMutation({
    mutationFn: ({ businessID, id }: { businessID: string; id: number }) =>
      deleteBusinessSubcategory(businessID, id),
    onSuccess: () => {
      toast({
        title: 'Selected Categories Deleted',
        description: 'Business subcategory deleted successfully.',
        variant: 'success',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Error deleting business subcategory: ${error.message}`, // Fixed string interpolation
        variant: 'error',
      });
    },
  });

  return {
    deleteSubcategory: mutation.mutateAsync,
    loading: mutation.isPending, // Correct state for loading
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
