import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ketero/ui';
import { List, SquaresFour } from '@phosphor-icons/react';
import AnalyticsSection from './section/analytics';
import DataTable from './section/data-table';
import { columns } from './section/table/columus';

const ReservationPage = (props) => {
  const tasks = [
    {
      shopName: 'TTK',
      ownerName: 'owner1',
      user: {
        phoneNumber: '+251911223344',
      },
      pendingReservation: 5,
      activeReservation: 2,
    },
    {
      shopName: 'Coffee Corner and Bakery Express',
      ownerName: 'owner1',
      user: {
        phoneNumber: '+251911223344',
      },
      pendingReservation: 5,
      activeReservation: 9,
    },
  ];

  return (
    <div>
      <Tabs className="space-y-4 ">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight text-primary "
          >
            Reservation List
          </motion.h1>
        </div>
        <AnalyticsSection />
        <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Active Reserve Business</CardTitle>
              <CardDescription>Recent Business by orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={tasks} columns={columns} />
            </CardContent>
          </Card>
        </main>
      </Tabs>
    </div>
  );
};

export default ReservationPage;
