import { useBusiness } from '@/client/services/businesses';
import { useDialog } from '@/client/stores/dialog';
import { BusinessDto } from '@ketero/dto';
import { Button } from '@ketero/ui';
import { sortByDate } from '@ketero/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin } from '@phosphor-icons/react';
import React from 'react';
import { colors } from '@/client/constants/colors';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ketero/ui';
const CompanyList = (props) => {
  const { business, loading } = useBusiness();
  const { open } = useDialog<BusinessDto>('business');

  const onUpdate = (company) => {
    open('update', { id: 'business', item: company });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Table variant="surface">
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Owner Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Working Hour</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow
                  key={i}
                  className="duration-300 animate-in fade-in"
                  style={{
                    animationFillMode: 'backwards',
                    animationDelay: `${i * 300}ms`,
                  }}
                >
                  <TableHead className=""></TableHead>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            <AnimatePresence>
              {business
                ?.sort((a, b) => sortByDate(a, b, 'updatedAt'))
                .map((business, index) => (
                  <TableRow key={business.id}>
                    <TableHead>{business.name}</TableHead>
                    <TableCell>{business.user.name}</TableCell>
                    <TableCell>{business.user.phoneNumber}</TableCell>
                    <TableCell>{business.workingHours}</TableCell>
                    <TableCell>
                      <MapPin
                        size={32}
                        weight="duotone"
                        color="#94131F"
                        onClick={() => {
                          window.location.href = business.location;
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          onUpdate(business);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </>
  );
};

export default CompanyList;
