// @ts-nocheck
import React from 'react';
import { UserNav } from './user-nav';
import { Link } from 'react-router-dom';
import {
  Button,
  Calendar,
  // Heart,
  MapPin,
  Star,
  // Scissors,
  TrendingUp,
  Clock,
} from '@ketero/ui';
import { Logo } from '@/client/components/logo';
// import {} from 'lucide-react';
import { Heart } from '@phosphor-icons/react';

const Header = (props) => {
  return (
    // <header className="bg-white border-b border-gray-200">
    //   <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    //     <div className="flex items-center gap-2">
    //       {/* <Calendar className="h-6 w-6 text-primary" /> */}
    //       <Logo className="h-6 w-6 text-primary" />
    //       <span className="font-semibold text-xl">ServiceBook</span>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       <Link
    //         href="/my-account"
    //         className="text-gray-600 hover:text-gray-900 text-sm font-medium"
    //       >
    //         My Account
    //       </Link>
    //       <Button>My Reservation</Button>
    //     </div>
    //   </div>
    // </header>
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-10 text-primary" />
          {/* <Scissors className="h-6 w-6 text-pink-500" /> */}

          <span className="font-semibold text-xl text-primary">Ketero</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-900 hover:text-pink-500 font-medium"
          >
            Home
          </Link>
          <Link href="/salons" className="text-gray-600 hover:text-pink-500">
            Salons
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-pink-500">
            Services
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-pink-500">
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/reservations"
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          >
            {/* <Calendar className="h-4 w-4" /> */}
            My Reservation
          </Link>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Heart className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
