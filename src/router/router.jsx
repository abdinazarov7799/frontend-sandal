import React, {Suspense} from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { OverlayLoader } from "../components/loader";
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs";


// LAYOUTS
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";
// LAYOUTS

// AUTH
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import IsHasProfile from "../services/auth/IsHasProfile";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
// AUTH

// PROFILE
import ProfilePage from "../modules/profile/pages/ProfilePage";
// PROFILE

// 404
import NotFoundPage from  "../modules/auth/pages/NotFoundPage";
// 404

// PAGES
import RolesPage from "../modules/roles/pages/RolesPage";
// PAGES


const Router = ({ ...rest }) => {
dayjs.extend(utc)
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <IsHasProfile>
            <Routes>
              <Route path={"/"} element={<DashboardLayout />}>
                <Route
                    path={"/users-roles"}
                    index
                    element={<RolesPage />}
                />
                <Route
                    path={"/profile"}
                    index
                    element={<ProfilePage />}
                />
                <Route
                    path={"auth/*"}
                    element={<Navigate to={"/profile"} replace />}
                />
                <Route
                    path={"/"}
                    element={<Navigate to={"/profile"} replace />}
                />
                <Route path={"*"} element={<NotFoundPage />} />
              </Route>
            </Routes>
          </IsHasProfile>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              <Route path={'/auth/register'} element={<RegisterPage />} />
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
