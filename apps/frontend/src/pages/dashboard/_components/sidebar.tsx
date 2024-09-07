// @ts-nocheck
import {
  Compass,
  FadersHorizontal,
  ReadCvLogo,
  Gear,
} from '@phosphor-icons/react';
import { Button, KeyboardShortcut, Separator, Badge } from '@ketero/ui';
import { cn } from '@ketero/utils';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useKeyboardShortcut from 'use-keyboard-shortcut';

import { Icon } from '@/client/components/icon';
import { useUser } from '@/client/services/user';
import { Role } from '@/client/router/utils/role.enum';
import { UserOptions } from '@/client/components/user-options';
import { UserAvatar } from '@/client/components/user-avater';

type Props = {
  className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      'size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info',
      className
    )}
  />
);

type SidebarItem = {
  path: string;
  name: string;
  shortcut?: string;
  icon: React.ReactNode;
};

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({
  path,
  name,
  shortcut,
  icon,
  onClick,
}: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        'h-auto justify-start px-4 py-3',
        isActive &&
          'pointer-events-none bg-secondary/50 text-secondary-foreground'
      )}
      onClick={onClick}
    >
      <Link to={path}>
        <div className="mr-3">{icon}</div>
        <span>{name}</span>
        {isActive && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
};
const getSidebarItems = (role: Role) => {
  switch (role) {
    case Role.VirtualAssistant:
      return [
        {
          path: '/dashboard',
          name: 'Dashboard',
          shortcut: '⇧D',
          icon: <ReadCvLogo />,
        },
        {
          path: '/dashboard/businesses',
          name: 'Businesses',
          shortcut: '⇧B',
          icon: <Compass />,
        },
        {
          path: '/dashboard/reservation',
          name: 'Reservation',
          shortcut: '⇧R',
          icon: <FadersHorizontal />,
        },
        // {
        //   path: '/dashboard/service',
        //   name: 'Service',
        //   shortcut: '⇧R',
        //   icon: <FadersHorizontal />,
        // },
        // {
        //   path: '/dashboard/setting',
        //   name: 'Settings',
        //   shortcut: '⇧S',
        //   icon: <Gear />,
        // },
      ];
    case Role.Business:
      return [
        {
          path: '/dashboard',
          name: 'Dashboard',
          shortcut: '⇧D',
          icon: <ReadCvLogo />,
        },
        {
          path: '/dashboard/myreservation',
          name: 'Reservation',
          shortcut: '⇧R',
          icon: <FadersHorizontal />,
        },
        {
          path: '/dashboard/service',
          name: 'My Service',
          shortcut: '⇧R',
          icon: <FadersHorizontal />,
        },
        {
          path: '/dashboard/profile',
          name: 'Profile',
          shortcut: '⇧S',
          icon: <Gear />,
        },
      ];
    case Role.Client:
      return [
        // {
        //   path: '/profile',
        //   name: 'Profile',
        //   shortcut: '⇧P',
        //   icon: <Compass />,
        // },
        {
          path: '/reservation',
          name: 'My Reservation',
          shortcut: '⇧R',
          icon: <FadersHorizontal />,
        },
        {
          path: '/business',
          name: 'Business',
          shortcut: '⇧B',
          icon: <Compass />,
        },
        {
          path: 'client/profile',
          name: 'Profile',
          shortcut: '⇧D',
          icon: <Compass />,
        },
      ];
    default:
      return [];
  }
};
export const Sidebar = ({ setOpen }: SidebarProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const sidebarItems = getSidebarItems(user.role);

  useKeyboardShortcut(['shift', 'r'], () => {
    navigate('/dashboard/resumes');
    setOpen?.(false);
  });

  useKeyboardShortcut(['shift', 's'], () => {
    navigate('/dashboard/settings');
    setOpen?.(false);
  });

  return (
    <div className="flex h-full flex-col gap-y-4">
      <div className="ml-12 flex justify-center lg:ml-0">
        <Button asChild size="icon" variant="ghost" className="size-32 p-0">
          <Link to="/">
            <Icon size={600} className="mx-auto hidden lg:block" />
          </Link>
        </Button>
      </div>

      <Separator className="opacity-50" />

      <div className="grid gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}
      </div>

      <div className="flex-1" />

      <Separator className="opacity-50" />

      <Button
        size="md"
        variant="outline"
        className={cn(
          'h-auto justify-start px-4 py-3 text-center',
          true &&
            'pointer-events-none bg-secondary/50 text-secondary-foreground'
        )}
      >
        {user?.role}
      </Button>
      <UserOptions>
        <Button size="lg" variant="ghost" className="w-full justify-start px-3">
          <UserAvatar size={24} className="mr-3" />
          <span>{user?.name}</span>
        </Button>
      </UserOptions>
    </div>
  );
};
