import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ketero/ui';
import { List, SquaresFour } from '@phosphor-icons/react';
import { useBusiness } from '@/client/services/businesses';
import { BusinessDto } from '@ketero/dto';
import { useDialog } from '@/client/stores/dialog';
import { DataTableDemo } from './_layout/test';
import ShopList from './_layout/table';

const BusinessesPage = (props) => {
  const { business, loading } = useBusiness();
  const { open } = useDialog<BusinessDto>('business');

  const onOpen = () => {
    open('create');
  };
  return (
    <>
      <Tabs className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight text-primary "
          >
            Company List
          </motion.h1>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            Add Business Company
          </Button>
        </div>
        <ShopList />
        {/* <DataTableDemo /> */}
      </Tabs>
    </>
  );
};

export default BusinessesPage;
