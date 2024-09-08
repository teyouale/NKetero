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
import RoleBasedGuard from './guards/role';
import BusinessesPage from '../pages/dashboard/shop';
import { Role } from './utils/role.enum';

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

const VirtualAssistantRoutes = (
  <Route element={<RoleBasedGuard roles={[Role.VirtualAssistant]} />}>
    <Route path="businesses" element={<BusinessesPage />} />
    {/* <Route path="reservation" element={<ReservationPage />} />
    <Route path="setting" element={<SettingPage />} />
    <Route
      path="reservation/:reservationID"
      loader={detailLoader}
      element={<BusinessReservationPage />}
    /> */}
  </Route>
);
// const BusinessRoutes = ();

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    {AuthRoutes}

    <Route path="dashboard">
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          {VirtualAssistantRoutes}
          {/* {BusinessRoutes()} */}
          <Route index element={<h1>This Dashbaord home page</h1>} />
        </Route>
        {/* <h1>ad</h1> */}
        {/* <Route element={<DashboardLayout />}> */}
        {/* {VirtualAssistantRoutes()} */}
        {/* {BusinessRoutes()} */}
        {/* </Route> */}
      </Route>
    </Route>

    <Route path="*" element={<Navigate replace to="/auth/login" />} />
  </Route>
);

export const router = createBrowserRouter(routes);
