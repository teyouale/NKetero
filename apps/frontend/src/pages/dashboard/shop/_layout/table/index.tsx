import { useBusiness } from '@/client/services/businesses';
import { useDialog } from '@/client/stores/dialog';
import { BusinessDto } from '@ketero/dto';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';

export default function ShopList(props) {
  const { business, loading } = useBusiness();
  const { open } = useDialog<BusinessDto>('business');
  console.log(business);
  const data = [
    {
      id: 'cm0sqfjxc0002x2urxc1rbkbp',
      location: [8.966514, 38.728697],
      name: "teyouale2's Business",
      user: { name: 'teyouale', phoneNumber: '+251938069240' },
    },
    {
      id: 'cm0sqfjxc0002x2urxc1rbkbp',
      location: [8.966514, 38.728697],
      name: "teyouale2's Business",
      user: { name: 'teyouale', phoneNumber: '+251938069240' },
    },
    {
      id: 'cm0sqfjxc0002x2urxc1rbkbp',
      location: [8.966514, 38.728697],
      name: "teyouale2's Business",
      user: { name: 'teyouale', phoneNumber: '+251938069240' },
    },
  ];

  const onUpdate = (company) => {
    open('update', { id: 'business', item: company });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {business ? <DataTable columns={columns} data={business} /> : ''}
      </motion.div>
    </>
  );
}
