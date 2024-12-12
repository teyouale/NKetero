import { CreateReservationDto, ReservationDto } from '@ketero/dto';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axios } from '@/client/libs/axios';
import { queryClient } from '@/client/libs/query-client';
import {
  BUSINESS_KEY,
  COMPANY_KEY,
  RESERVATIONS_KEY,
  RESERVATION_KEY,
} from '@/client/constants/query-keys';

export const createReservation = async (data: CreateReservationDto) => {
  const response = await axios.post<
    ReservationDto,
    AxiosResponse<ReservationDto>,
    CreateReservationDto
  >('/reservations', data);
  return response.data;
};

export const useCreateReservation = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createReservationFn,
  } = useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      queryClient.setQueryData<ReservationDto>(
        [RESERVATION_KEY, { id: data.id }],
        data
      );

      queryClient.setQueryData<ReservationDto[]>(RESERVATIONS_KEY, (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });
  return { createReservation: createReservationFn, loading, error };
};
