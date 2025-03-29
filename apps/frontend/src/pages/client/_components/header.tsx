// @ts-nocheck
import React from 'react';
import { UserNav } from './user-nav';
import { Link } from 'react-router-dom';
import { Button, Calendar } from '@ketero/ui';
import { Logo } from '@/client/components/logo';

const Header = (props) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <Calendar className="h-6 w-6 text-primary" /> */}
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">ServiceBook</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/my-account"
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            My Account
          </Link>
          <Button>My Reservation</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
