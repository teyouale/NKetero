import { Card, CardContent, CardHeader, CardTitle } from '@ketero/ui';
import React from 'react';
import ReservationTable from './ReservationTable';
import {
  LoaderFunction,
  redirect,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import {
  RESERVATIONS_KEY,
  RESERVATION_KEY,
} from '@/client/constants/query-keys';
import { queryClient } from '@/client/libs/query-client';
import { ReservationDto } from '@ketero/dto';
import {
  fetchMyBusinessReservation,
  findReservationByBusiness,
} from '@/client/services/reservation';
import { toast } from '@/client/hooks/use-toast';

const BusinessReservationPage = () => {
  const reservationData = useLoaderData<ReservationDto[]>(); // Type your data for better development experience.
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Business Reservations</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* Repeat similar Cards with meaningful data */}
      </div>
      <ReservationTable reservationData={reservationData} />
    </div>
  );
};

export default BusinessReservationPage;

export const detailLoader: LoaderFunction<ReservationDto> = async ({
  params,
}) => {
  const reservationID = params.reservationID!;
  try {
    const reservation = await queryClient.fetchQuery({
      queryKey: [RESERVATION_KEY, reservationID],
      queryFn: () => findReservationByBusiness(reservationID),
    });
    return reservation;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    toast({
      title: 'Reservation Not Found',
      description: 'Unable to fetch reservation details.',
    });
    return redirect('/dashboard');
  }
};

export const detailLoaderBusiness: LoaderFunction<ReservationDto[]> = async () => {
  try {
    const reservations = await queryClient.fetchQuery({
      queryKey: [RESERVATIONS_KEY, { me: 'me' }],
      queryFn: () => fetchMyBusinessReservation(),
    });
    return reservations;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    toast({
      title: 'No Reservations Found',
      description:
        'It seems that you have no upcoming reservations. Please add a new reservation or check back later.',
    });
    return redirect('/dashboard');
  }
};
