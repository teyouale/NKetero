import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ketero/ui';
import { MapPinSimple } from '@phosphor-icons/react';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span
        style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#666' }}
      >
        {row.original.id}
      </span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Business Name',
    cell: ({ row }) => (
      <span
        className="truncate font-medium"
        // style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}
      >
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'user.name',
    header: 'User Name',
    cell: ({ row }) => <span>{row.original.user.name}</span>,
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
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const [latitude, longitude] = row.original.location;
      const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      return (
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1a73e8', fontSize: '1.5rem' }}
        >
          <MapPinSimple size={32} />
        </a>
      );
    },
  },
];

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: 'status',
//     header: 'Status',
//   },
//   {
//     accessorKey: 'email',
//     header: 'Email',
//   },
//   {
//     accessorKey: 'amount',
//     header: 'Amount',
//   },
// ];
