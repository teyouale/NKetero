import { axios } from '@/client/libs/axios';
import { useQuery } from '@tanstack/react-query';

export const fetchBusinessServices = async (businessId: string) => {
  const response = await axios.get(`/service/business/${businessId}`);
  return response.data;
};

// Hook to fetch business services based on businessId
export const useBusinessService = (businessId: string) => {
  const {
    error,
    isLoading,
    data: MyServices,
  } = useQuery({
    queryKey: ['businessServices', businessId], // Include businessId in the queryKey
    queryFn: () => fetchBusinessServices(businessId), // Pass businessId to the query function
    staleTime: Infinity, // Always treat data as stale
    refetchOnMount: true, // Always refetch on component mount
    refetchOnWindowFocus: true, // Refetch when window gains focus
    enabled: !!businessId, // Only run query if businessId is provided
  });

  return { MyServices, loading: isLoading, error };
};
