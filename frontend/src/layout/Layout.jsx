import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuthStore } from "../store/useAuthStore";

export default function Layout() {
  const { authUser } = useAuthStore();

  return (
    <>
      {authUser && <Header />}
      <Outlet />
      {authUser && <Footer />}
    </>
  );
}
