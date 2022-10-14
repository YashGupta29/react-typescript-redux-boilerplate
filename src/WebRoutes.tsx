import React, { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LazyLoadComponent from "./hoc/LazyLoadComponent";
import WebProtectedRoute from "./hoc/WebProtectedRoute";

// pages
const Home = React.lazy(() => import("./pages/Home/Home.page"));
const Login = React.lazy(() => import("./pages/Login/Login.page"));

const WebRoutes = () => {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/login" element={<LazyLoadComponent Component={Login} />} />
      {/* all auth protected routes will nest inside this route */}
      <Route element={<WebProtectedRoute />}>
        <Route path="/" element={<LazyLoadComponent Component={Home} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default WebRoutes;
