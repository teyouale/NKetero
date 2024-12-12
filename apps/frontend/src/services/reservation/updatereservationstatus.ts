// @ts-nocheck
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BUSINESS_RESERVATIONS_KEY } from '@/client/constants/query-keys';
import { ReservationDto } from '@ketero/dto';

export const useUpdateReservationStatus = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: updateReservationStatusFn,
        isLoading: loading,
        error,
    } = useMutation({
        mutationFn: ({ reservationId, status }: { reservationId: string; status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' }) =>
            updateReservationStatus(reservationId, status),
        onSuccess: (data) => {
            // Update cache for specific reservation
            queryClient.setQueryData<ReservationDto>(
                [BUSINESS_RESERVATIONS_KEY, { id: data.id }],
                data
            );

            // Update cache for reservations list
            queryClient.setQueryData<ReservationDto[]>(
                BUSINESS_RESERVATIONS_KEY,
                (oldData) => oldData?.map(reservation =>
                    reservation.id === data.id ? data : reservation
                ) ?? []
            );

            // Invalidate and refetch reservations data
            queryClient.invalidateQueries(BUSINESS_RESERVATIONS_KEY);
        },
    });

    return { updateReservation: updateReservationStatusFn, loading, error };
};
