import { Toaster, TooltipProvider } from '@ketero/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import { helmetContext } from '../constants/helmet';
import { queryClient } from '../libs/query-client';
import { AuthRefreshProvider } from './auth-refresh';
import { DialogProvider } from './dialog';

export const Providers = () => (
  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <AuthRefreshProvider>
        <TooltipProvider>
          <DialogProvider>
            <Outlet />
            <Toaster />
          </DialogProvider>
        </TooltipProvider>
      </AuthRefreshProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
