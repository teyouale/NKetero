// @ts-nocheck

import { ScrollArea } from '@radix-ui/react-scroll-area';
import React from 'react';
import Header from './_components/header';
import { Outlet } from 'react-router-dom';

const ClientLayout = (props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-full flex flex-col space-y-8 p-8">
        <ScrollArea orientation="vertical" className="flex-1">
          <Outlet />
          {/* <Footer /> */}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ClientLayout;
