import { CATEGORIES_KEY, MY_CATEGORIES_KEY } from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';
import { CategoryDto } from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';

export const fetchAllCategories = async () => {
    const response = await axios.get('/categories');
    return response.data;
};

export const fetchMyService = async () => {
    const response = await axios.get('/service');
    return response.data;
};

export const useService = () => {
    const {
        error,
        isLoading,
        data: services,
    } = useQuery({
        queryKey: [MY_CATEGORIES_KEY],
        queryFn: fetchMyService,
    });

    return { services, loading: isLoading, error };
};
