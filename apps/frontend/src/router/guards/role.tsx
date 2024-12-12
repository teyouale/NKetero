import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '@/client/services/user';

const RoleBasedGuard = ({ roles }) => {
  const { user, loading } = useUser();

  const location = useLocation();
  const redirectTo = location.pathname + location.search;

  if (loading) return null;
  if (!user) {
    return <Navigate replace to={`/auth/login?redirect=${redirectTo}`} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleBasedGuard;
