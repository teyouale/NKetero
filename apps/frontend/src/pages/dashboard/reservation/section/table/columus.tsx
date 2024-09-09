import { Badge } from '@ketero/ui';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { businessSchema } from './data/schema';

export const columns: ColumnDef<z.infer<typeof businessSchema>>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Business Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px] truncate">{row.getValue('name')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'ownerName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="font-medium">{row.getValue('ownerName')}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => (
      <span>
        <Badge variant="outline" className="mr-1">
          🇪🇹
        </Badge>{' '}
        <span style={{ fontFamily: 'monospace' }}>
          {row
            .getValue('phoneNumber')
            .replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2-$3-$4')}
        </span>
      </span>
    ),
  },
  {
    accessorKey: 'pendingReservationsCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending Reservations" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.getValue('pendingReservationsCount')} </span>{' '}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'activeReservationsCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active Reservations" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span>{row.getValue('activeReservationsCount')}</span>{' '}
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
