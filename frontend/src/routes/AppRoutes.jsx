import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import Loading from "../components/Loading/Loading";
const AppRoutes = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) return <Loading />;
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="bottom-right" />
    </>
  );
};

export default AppRoutes;
