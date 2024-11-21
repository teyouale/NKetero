import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ketero/ui';
import { PlusCircle, Export, Funnel } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableList from '../section/TableList';
import { useDialog } from '@/client/stores/dialog';
import { BusinessDto } from '@ketero/dto';

const ReservationTable = ({ reservationData }) => {
  const { open } = useDialog<BusinessDto>('reservation');
  const [business, setBusiness] = useState(reservationData);

  const onOpen = () => {
    open('create');
  };
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4  ">
      <main className="grid flex-1 items-start gap-md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
              <TabsTrigger value="Cancelled" className="hidden sm:flex">
                Cancelled
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <Funnel className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <Export className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              {/* <Button
                size="lg"
                className="  gap-1"
                onClick={() => {
                  onOpen();
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Reservation
                </span>
              </Button> */}
            </div>
          </div>
          <TabsContent value={'all'}>
            <TableList business={business} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ReservationTable;
