// @ts-nocheck
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ketero/ui';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '../services/auth';

type Props = {
  children: React.ReactNode;
};

export const UserOptions = ({ children }: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuItem
          onClick={() => {
            navigate('/dashboard/settings');
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
