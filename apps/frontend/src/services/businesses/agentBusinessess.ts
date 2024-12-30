import { BusinessDto } from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { BUSINESS_KEY } from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';

export const fetchAgentBusiness = async () => {
    const response = await axios.get<BusinessDto[], AxiosResponse<BusinessDto[]>>(
        '/business/Agent'
    );
    return response.data;
};

export const useAgentBusiness = () => {
    const {
        error,
        isPending: loading,
        data: business,
    } = useQuery({
        queryKey: BUSINESS_KEY,
        queryFn: fetchAgentBusiness,
    });

    return { business, loading, error };
};
