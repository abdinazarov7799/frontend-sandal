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
import LoginPage from "../modules/auth/pages/LoginPage";
// AUTH

// PROFILE
import ProfilePage from "../modules/profile/pages/ProfilePage";
// PROFILE

// 404
import NotFoundPage from  "../modules/auth/pages/NotFoundPage";
// 404

// PAGES
import UsersPage from "../modules/users/pages/UsersPage.jsx";
import ProductsPage from "../modules/products/pages/ProductsPage.jsx";
import MyRequestsPage from "../modules/myRequests/pages/MyRequestsPage.jsx";
import RequestsPage from "../modules/requests/pages/RequestsPage.jsx";
import ProductsViewPage from "../modules/products/pages/ProductsViewPage.jsx";
// PAGES


const Router = ({ ...rest }) => {
dayjs.extend(utc)
  return (
    <BrowserRouter>
      <Suspense fallback={<OverlayLoader />}>
        <IsAuth>
          <Routes>
            <Route path={"/"} element={<DashboardLayout />}>
              <Route
                  path={"/products"}
                  index
                  element={<ProductsPage />}
              />
              <Route
                  path={"products/view/:id"}
                  element={<ProductsViewPage />}
              />
              <Route
                  path={"/my-requests"}
                  index
                  element={<MyRequestsPage />}
              />
              <Route
                  path={"/requests"}
                  index
                  element={<RequestsPage />}
              />
              <Route
                  path={"/users"}
                  index
                  element={<UsersPage />}
              />
              <Route
                  path={"/profile"}
                  index
                  element={<ProfilePage />}
              />
              <Route
                  path={"auth/*"}
                  element={<Navigate to={"/products"} replace />}
              />
              <Route
                  path={"/"}
                  element={<Navigate to={"/products"} replace />}
              />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/auth"} element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path={"*"} element={<Navigate to={"/auth"} replace />} />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
