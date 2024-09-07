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

export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="auth">
      <Route element={<AuthLayout />}>
        <Route element={<GuestGuard />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate replace to="/auth/login" />} />
    <Route path="/dashboard" element={<h1>Helo</h1>} />
  </Route>
);

export const router = createBrowserRouter(routes);
