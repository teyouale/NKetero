import { Badge, Checkbox } from '@ketero/ui';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { ReservationSchema } from './data/schema';
import { statuses } from './data/data';

export const columns: ColumnDef<ReservationSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'client',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.original.client.name}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('service')}
        </span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue('date');
      return (
        <div className="flex items-center">
          <span>
            {dateValue ? new Date(dateValue).toLocaleDateString() : ''}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'price', // Ensure this matches your data schema
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const priceValue = row.getValue('price');
      return (
        <div className="flex items-center">
          <span>{priceValue.toFixed(2)} birr</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const price = row.getValue(id);
      return price >= value[0] && price <= value[1]; // Filter price by range
    },
    filterType: 'between', // Enable filtering by a range
  },
  // Uncomment and customize this column if you have actions to perform
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];