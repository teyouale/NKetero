import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import { AuthLayout } from '../pages/auth/layout';
import { GuestGuard } from './guards/guest';
import { LoginPage } from '../pages/auth/login/page';
import { RegisterPage } from '../pages/auth/register/page';
import { Providers } from '../providers';
import { AuthGuard } from './guards/auth';
import { DashboardLayout } from '../pages/dashboard/layout';

const AuthRoutes = (
  <Route path="auth">
    <Route element={<AuthLayout />}>
      <Route element={<GuestGuard />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Route>
  </Route>
);

// const VirtualAssistantRoutes = ();
// const BusinessRoutes = ();

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    {AuthRoutes}

    <Route path="/dashboard" element={<AuthGuard />}>
      <Route element={<DashboardLayout />}>
        {/* <h1>Hello</h1> */}
        {/* VirtualAssistantRoutes()} */}
        {/* {BusinessRoutes()} */}
        <Route index element={<h1>This Dashbaord home page</h1>} />
      </Route>
      {/* <h1>ad</h1> */}
      {/* <Route element={<DashboardLayout />}> */}
      {/* {VirtualAssistantRoutes()} */}
      {/* {BusinessRoutes()} */}
      {/* </Route> */}
    </Route>
    <Route path="*" element={<Navigate replace to="/auth/login" />} />
  </Route>
);

export const router = createBrowserRouter(routes);
