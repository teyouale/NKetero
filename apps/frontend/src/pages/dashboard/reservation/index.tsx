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
import DataTable from './section/listTable/data-table';
import { columns } from './section/listTable/columus';
import { useReservation } from '@/client/services/reservation';

const ReservationPage = (props) => {
  const { reservation, loading } = useReservation();

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
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Active Reserve Business</CardTitle>
              <CardDescription>Recent Business by orders.</CardDescription>
            </CardHeader>
            <CardContent>
              {reservation && reservation.length > 0 ? (
                <DataTable data={reservation} columns={columns} />
              ) : (
                <DataTable columns={columns} data={[]} />
              )}
            </CardContent>
          </Card>
        </main>
      </Tabs>
    </div>
  );
};

export default ReservationPage;
