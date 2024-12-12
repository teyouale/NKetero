import {
  BusinessDto,
  GetBusinessesReservationDto,
  ReservationDto,
} from '@ketero/dto';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import {
  BUSINESS_RESERVATIONS_KEY,
  RESERVATIONS_KEY,
} from '@/client/constants/query-keys';
import { axios } from '@/client/libs/axios';

export const fetchActiveReservation = async () => {
  const response = await axios.get<
    GetBusinessesReservationDto[],
    AxiosResponse<GetBusinessesReservationDto[]>
  >('/reservations');
  return response.data;
};

export const findReservationByBusiness = async (reservationID: string) => {
  const response = await axios.get<ReservationDto>(
    `/reservations/business/${reservationID}`
  );
  return response.data;
};
export const fetchMyBusinessReservation = async () => {
  const response = await axios.get<ReservationDto>(
    `/reservations/business`
  );
  return response.data;
};

export const useReservation = () => {
  const {
    error,
    isPending: loading,
    data: reservation,
  } = useQuery({
    queryKey: BUSINESS_RESERVATIONS_KEY,
    queryFn: fetchActiveReservation,
  });

  return { reservation, loading, error };
};
