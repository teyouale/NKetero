import { toast } from '@ketero/ui';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ServiceFormData {
  name: string;
  price: number;
  businessId: string;
}

const createCustomSubcategory = async ({
  businessId,
  name,
  price,
}: {
  businessId: string;
  name: string;
  price: number;
}) => {
  const response = await axios.post('/api/service/customsubcatgory', {
    businessId,
    name,
    price,
  });
  return response.data;
};

export const useCreateCustomSubcategory = () => {
  const mutation = useMutation({
    mutationFn: createCustomSubcategory,
    onSuccess: () => {
      toast({
        title: 'Subcategory created ',
        description: 'Custom subcategory created successfully.',
        variant: 'success',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Subcategory Error ',
        description: `Error creating custom subcategory: ${error.message}`,
        variant: 'error',
      });
    },
  });

  return {
    createSubcategory: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};
