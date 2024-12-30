// // import { CardContent, CardHeader, CardTitle } from '@ketero/ui';
// // import { Card } from '@radix-ui/themes';

// import { Card, CardContent, CardHeader, CardTitle } from '@ketero/ui';
// import React from 'react';
// import ReservationTable from './ReservationTable';
// import {
//   redirect,
//   useLoaderData,
//   useParams,
// } from 'react-router-dom';
// import type { LoaderFunction } from 'react-router-dom';
// import {
//   RESERVATIONS_KEY,
//   RESERVATION_KEY,
// } from '@/client/constants/query-keys';
// import { queryClient } from '@/client/libs/query-client';
// import { ReservationDto } from '@ketero/dto';
// import {
//   fetchMyBusinessReservation,
//   findReservationByBusiness,
// } from '@/client/services/reservation';
// import { useUser } from '@/client/services/user';
// import { toast } from '@/client/hooks/use-toast';

// const BusinessReservationPage = (props) => {
//   const reservationData = useLoaderData();
//   const { id } = useParams();
//   return (
//     <div className="">
//       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//         <Card x-chunk="dashboard-01-chunk-0">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$45,231.89</div>
//             <p className="text-xs text-muted-foreground">
//               +20.1% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-1">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//             {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+2350</div>
//             <p className="text-xs text-muted-foreground">
//               +180.1% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-2">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Sales</CardTitle>
//             {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+12,234</div>
//             <p className="text-xs text-muted-foreground">
//               +19% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-3">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//             {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+573</div>
//             <p className="text-xs text-muted-foreground">
//               +201 since last hour
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <ReservationTable reservationData={reservationData} />
//     </div>
//   );
// };

// export default BusinessReservationPage;

//   export const detailLoader: LoaderFunction = async ({ params }) => {
//   params,
// }) => {
//   try {
//     const reservationID = params.reservationID!;
//     const reservation = await queryClient.fetchQuery({
//       queryKey: [RESERVATIONS_KEY, { reservationID }],
//       queryFn: () => findReservationByBusiness(reservationID),
//     });

//     return reservation;
//   } catch (e) {
//     console.error(e);
//     return redirect('/dashboard');
//   }
// };
// export const detailLoader: LoaderFunction<ReservationDto> = async ({

//   try {
//     const reservation = await queryClient.fetchQuery({
//       queryKey: [RESERVATIONS_KEY, { me: 'me' }],
//       queryFn: () => fetchMyBusinessReservation(),
//     });
//     return reservation;
//   } catch (e) {
//     toast({
//       title: 'No Reservations Found',
//       description:
//         'It seems that you have no upcoming reservations. Please add a new reservation or check back later.',
//     });
//     return redirect('/dashboard');
//   }
// };
