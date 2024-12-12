// @ts-nocheck
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  toast,
} from '@ketero/ui';
import { motion } from 'framer-motion';
import React from 'react';
import AnalyticsSection from './section/analytics';
import reservation from '.';
import { columns } from './section/reservationTable/columus';
import DataTable from './section/reservationTable/data-table';
import {
  fetchMyBusinessReservation,
  findReservationByBusiness,
} from '@/client/services/reservation';
import {
  BUSINESS_RESERVATIONS_KEY,
  RESERVATIONS_KEY,
} from '@/client/constants/query-keys';
import { queryClient } from '@/client/libs/query-client';
import { ReservationDto } from '@ketero/dto';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

const SingleReservationPage = (props) => {
  const loaderData = useLoaderData();
  const { reservation, ...businessInfo } = loaderData;
  return (
    <Tabs className="space-y-4 ">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tight text-primary "
        >
          Reservation List for {businessInfo.name}
        </motion.h1>
      </div>
      <AnalyticsSection />
      <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>
              Current Business Reservation for {businessInfo.name}
            </CardTitle>
            <CardDescription>Recent Business by orders.</CardDescription>
          </CardHeader>
          <CardContent>
            {reservation && reservation.length > 0 ? (
              <DataTable data={reservation} columns={columns} />
            ) : (
              <DataTable columns={columns} data={[]} />
            )}
            {/* <DataTable columns={columns} data={reservation} /> */}
          </CardContent>
        </Card>
      </main>
    </Tabs>
  );
};

export default SingleReservationPage;

export const detailLoader: LoaderFunction = async ({ params }) => {
  try {
    const reservationID = params.reservationID!;
    const reservation = await queryClient.fetchQuery({
      queryKey: [BUSINESS_RESERVATIONS_KEY, { id: reservationID }],
      queryFn: () => findReservationByBusiness(reservationID),
    });

    return reservation;
  } catch (e) {
    console.error(e);
    return redirect('/dashboard');
  }
};
export const detailLoaderBusiness: LoaderFunction<
  ReservationDto
> = async ({}) => {
  try {
    const reservation = await queryClient.fetchQuery({
      queryKey: [RESERVATIONS_KEY, { me: 'me' }],
      queryFn: () => fetchMyBusinessReservation(),
    });
    return reservation;
  } catch (e) {
    toast({
      title: 'No Reservations Found',
      description:
        'It seems that you have no upcoming reservations. Please add a new reservation or check back later.',
    });
    return redirect('/dashboard');
  }
};
