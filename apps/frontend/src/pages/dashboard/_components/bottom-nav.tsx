import React from 'react';
import { Home, Mail, Settings, User } from 'lucide-react';

const BottomNav = (props) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Businesses', icon: Mail, href: '/dashboard/businesses' },
    { name: 'Reservation', icon: User, href: '/dashboard/Reservation' },
    // { name: 'Settings', icon: Settings, href: '/settings' },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t ">
      <ul className="flex justify-around p-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="flex flex-col items-center p-2 text-gray-700"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
