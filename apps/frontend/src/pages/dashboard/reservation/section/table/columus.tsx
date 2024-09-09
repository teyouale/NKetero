import { Badge } from '@ketero/ui';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'shopName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shop Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] truncate">{row.getValue('shopName')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ownerName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium">{row.getValue('ownerName')}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'user.phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => (
      <span>
        <Badge variant="outline" className="mr-1">
          🇪🇹
        </Badge>{' '}
        <span style={{ fontFamily: 'monospace' }}>
          {row.original.user.phoneNumber.replace(
            /(\+\d{3})(\d{3})(\d{3})(\d{4})/,
            '$1 $2-$3-$4'
          )}
        </span>
      </span>
    ),
  },
  {
    accessorKey: 'pendingReservation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending Reservations" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.getValue('pendingReservation')} </span>{' '}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'activeReservation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active Reservations" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.getValue('activeReservation')}</span>{' '}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // Uncomment if you want to add actions for each row
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
