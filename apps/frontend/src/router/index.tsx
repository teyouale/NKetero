import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import UserProfile from '../pages/dashboard/Profile/UserProfile/UserProfile';
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
import ReservationPage from '../pages/dashboard/reservation';
import DashboardPage from '../pages/dashboard/home';
import SingleReservationPage, {
  detailLoader,
} from '../pages/dashboard/reservation/SingleReservationPage';
import ServicePage, { categoryLoader } from '../pages/dashboard/services';
import ClientLayout from '../pages/client/layout';
import ClientHomePage from '../pages/client/page';
// import BusinessReservationPage, {
//   detailLoaderBusiness,
// } from '../pages/dashboard/reservation/_layout/DetailReservationPage';
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

// Virtual Assistant Routes
const VirtualAssistantRoutes = (
  <Route element={<RoleBasedGuard roles={[Role.VirtualAssistant]} />}>
    <Route path="businesses" element={<BusinessesPage />} />
    <Route path="reservation" element={<ReservationPage />} />
    <Route path="Settings" element={<UserProfile />} />

    <Route
      path="reservation/:reservationID"
      loader={detailLoader}
      element={<SingleReservationPage />}
    />
    <Route
      path="service/:businessID"
      loader={categoryLoader}
      element={<ServicePage />}
    />
  </Route>
);

// Business Routes
const BusinessRoutes = (
  <Route element={<RoleBasedGuard roles={[Role.Business]} />}>
    {/* <Route
      path="myreservation"
      loader={detailLoaderBusiness}
      element={<BusinessReservationPage />}
    /> */}
    {/* <Route path="profile" element={<ProfilePage />} /> */}
    <Route path="service" loader={categoryLoader} element={<ServicePage />} />
  </Route>
);
const ClientRoutes = () => (
  <Route element={<ClientLayout />}>
    <Route element={<RoleBasedGuard roles={[Role.Client]} />}>
      {/* <Route
        path="business/:businessID"
        element={<BusinessPage />}
        loader={CompanydetailLoader}
      />
      <Route index element={<ClientHomePage />} /> */}
      <Route index element={<ClientHomePage />} />
    </Route>
  </Route>
);

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    {AuthRoutes}

    <Route path="dashboard">
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          {VirtualAssistantRoutes}
          {BusinessRoutes}
          <Route index element={<DashboardPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="/client" element={<AuthGuard />}>
      {ClientRoutes()}
    </Route>
    <Route path="*" element={<Navigate replace to="/auth/login" />} />
  </Route>
);

export const router = createBrowserRouter(routes);
