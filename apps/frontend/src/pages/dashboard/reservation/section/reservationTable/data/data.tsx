import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const statuses = [
  {
    value: 'PENDING',
    label: 'Pending',
    icon: StopwatchIcon,
  },
  {
    value: 'CONFIRMED',
    label: 'Confirmed',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
    icon: CrossCircledIcon,
  },
];
