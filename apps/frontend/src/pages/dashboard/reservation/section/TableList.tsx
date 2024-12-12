import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsContent,
} from '@ketero/ui';
import { DotsThreeCircle } from '@phosphor-icons/react';
import React from 'react';
import { cn } from '@ketero/utils';
import { useUpdateReservationStatus } from '@/client/services/reservation/updatereservationstatus';

const badgeVariantStyles = {
  PENDING: 'bg-gray-300 hover:bg-gray-300 text-gray-800',
  CONFIRMED: 'bg-green-700 hover:bg-green-700 text-white',
  CANCELLED: 'bg-primary hover:bg-primary text-white',
};

const ReservationTableRow = ({ reservation }) => {
  const { id, service, status, date, price, client } = reservation;
  const { updateReservation, loading } = useUpdateReservationStatus();

  const handleAccept = async () => {
    await updateReservation({ reservationId: id, status: 'CONFIRMED' });
  };

  const handleReject = async () => {
    await updateReservation({ reservationId: id, status: 'CANCELLED' });
  };

  return (
    <TableRow key={id}>
      <TableCell className="font-medium ">{client.name}</TableCell>
      <TableCell>
        <Badge variant="default" className={cn(badgeVariantStyles[status])}>
          {status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{date}</TableCell>
      <TableCell className="hidden md:table-cell">{service}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell className="gap-1 flex">
        {status === 'PENDING' && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 bg-green-800 text-white"
              onClick={handleAccept}
              disabled={loading}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Accept
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1 bg-red-700 text-white"
              onClick={handleReject}
              disabled={loading}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Reject
              </span>
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

const TableList = ({ business }) => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle className="text-primary font-extrabold text-xl">
          {business.name} Reservation
        </CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden  sm:table-cell">Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="hidden md:table-cell">Total Cost</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {business.reservation.map((data, index) => (
              <ReservationTableRow key={index} reservation={data} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TableList;
//
