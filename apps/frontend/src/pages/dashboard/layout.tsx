// import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Mail, Settings, User } from 'lucide-react';
import { Sidebar } from './_components/sidebar';
import BottomNav from './_components/bottom-nav';
import { Outlet } from 'react-router-dom';
import { useUser } from '@/client/services/user';

export const DashboardLayout = () => {
  const { user, loading } = useUser();
  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Messages', icon: Mail, href: '/messages' },
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex h-screen ">
      {/* Sidebar for desktop */}
      {/* <aside className="hidden md:flex flex-col w-64 bg-white border-r"></aside> */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[320px] lg:flex-col "
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>

      {/* Main content area */}
      <main className="flex-1 p-4 overflow-y-auto md:mx-6 my-4 lg:mx-8 lg:pl-[320px]">
        {/* <h2 className="text-2xl font-bold mb-4">Welcome to My App</h2>
        <p>This is where your main content will be displayed.</p> */}
        <Outlet />
      </main>

      {/* Bottom navigation for mobile */}
      <BottomNav />
    </div>
  );
};
