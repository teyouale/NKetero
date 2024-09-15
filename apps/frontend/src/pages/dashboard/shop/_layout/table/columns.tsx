import React from 'react';
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
import { useDialog } from '@/client/stores/dialog';
import { BusinessDto } from '@ketero/dto';
import { MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const columns: ColumnDef<BusinessDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#666',
        }}
      >
        {row.original.id}
      </span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Business Name',
    cell: ({ row }) => (
      <span className="truncate font-medium">{row.original.name}</span>
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
        </Badge>
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
      const { latitude, longitude } = row.original.location;
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
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { open } = useDialog<BusinessDto>('business');
      const navigate = useNavigate();

      const onUpdate = (company: BusinessDto) => {
        open('update', { id: 'business', item: company });
      };
      const businessId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <MoreVertical className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                onUpdate(row.original);
              }}
            >
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/dashboard/service/${businessId}`);
              }}
            >
              Edit Service
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
