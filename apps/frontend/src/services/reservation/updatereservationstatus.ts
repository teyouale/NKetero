import { ReservationDto } from '@ketero/dto';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axios } from '@/client/libs/axios';
import { queryClient } from '@/client/libs/query-client';
import { RESERVATION_KEY, RESERVATIONS_KEY } from '@/client/constants/query-keys';

export const updateReservationStatus = async (reservationId: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED') => {
    const response = await axios.put<
        ReservationDto,
        AxiosResponse<ReservationDto>,
        { status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' }
    >(`/reservations/${reservationId}/status`, { status });
    return response.data;
};

export const useUpdateReservationStatus = () => {
    const {
        error,
        isPending: loading,
        mutateAsync: updateReservationStatusFn,
    } = useMutation({
        mutationFn: ({ reservationId, status }: { reservationId: string; status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' }) =>
            updateReservationStatus(reservationId, status),
        onSuccess: (data) => {
            queryClient.setQueryData<ReservationDto>(
                [RESERVATION_KEY, { id: data.id }],
                data
            );

            queryClient.setQueryData<ReservationDto[]>(RESERVATIONS_KEY, (cache) => {
                if (!cache) return [data];
                return cache.map((reservation) =>
                    reservation.id === data.id ? data : reservation
                );
            });
        },
    });

    return { updateReservation: updateReservationStatusFn, loading, error };
};
