import { useReservation } from '@/client/services/reservation';
import { GetBusinessesReservationDto } from '@ketero/dto';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabsContent,
} from '@ketero/ui-components';
import { sortByDate } from '@ketero/utils';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { CreditCard } from '@phosphor-icons/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '@/client/services/user';
interface BusinessProfileProps {
  business: GetBusinessesReservationDto;
  index: number;
}
const BusinessProfile: React.FC<BusinessProfileProps> = ({
  business,
  index,
}) => {
  // const business = business ||
  const user = useUser();
  const navigate = useNavigate();
  return (
    <TableRow
      key={business.businessId}
      onClick={() => {
        navigate(business.businessId);
      }}
    >
      <TableCell>
        <div className=" font-medium">{business.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {business.email}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {business.ownerName}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="outline">
          {business.phoneNumber}
        </Badge>
      </TableCell>
      <TableCell className="hidden sm:table-cell text-center">
        {business.pendingReservationsCount}
      </TableCell>
      <TableCell className="text-center">
        {business.activeReservationsCount}
      </TableCell>
      <TableCell className="text-center ">
        <Button>Edit</Button>
      </TableCell>
    </TableRow>
  );
};
const ReservationList = (props) => {
  const { reservation, loading } = useReservation();
  return (
    <div>
      {' '}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">
              Total Revenue
            </CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">
              Subscriptions
            </CardTitle>
            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Sales</CardTitle>
            <CreditCard size={20} className=" text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Active Now</CardTitle>
            {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Active Reserve Business</CardTitle>
            <CardDescription>Recent Business by orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="border-primary">
                <TableRow>
                  <TableHead className=" md:table-cell">
                    Shop Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Owner Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Phone Number
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Pending Reservations
                  </TableHead>
                  <TableHead className="text-right">
                    Active Reservation
                  </TableHead>
                  <TableHead className="">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <TableRow
                      key={i}
                      className="  bg-accent duration-300 animate-in fade-in"
                      style={{
                        animationFillMode: 'backwards',
                        animationDelay: `${i * 300}ms`,
                      }}
                    >
                      <TableCell>
                        <div className=" font-medium"></div>
                        <div className="hidden text-sm text-muted-foreground md:inline"></div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell"></TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="outline"></Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell"></TableCell>
                      <TableCell className="text-center"></TableCell>
                    </TableRow>
                  ))}
                <AnimatePresence>
                  {reservation?.map((business, index) => (
                    <BusinessProfile business={business} index={index} />
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div> */}
      </main>
    </div>
  );
};

export default ReservationList;
