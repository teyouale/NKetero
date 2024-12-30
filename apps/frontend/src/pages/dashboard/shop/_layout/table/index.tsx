import { useBusiness } from '@/client/services/businesses';
import { BusinessDto } from '@ketero/dto';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { DataTable } from './data-table';
import columns from './columns';
import { useAgentBusiness } from '@/client/services/businesses';
import { useDialog } from '@/client/stores/dialog';

export default function ShopList(props) {
  const { business, loading } = useAgentBusiness();
  const { open } = useDialog<BusinessDto>('business');
  const onUpdate = (company) => {
    open('update', { id: 'business', item: company });
  };
  return (
    <>
      {/* hello */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {business && business.length > 0 ? (
          <DataTable columns={columns} data={business} />
        ) : (
          <DataTable columns={columns} data={[]} />
        )}
      </motion.div>
    </>
  );
}
