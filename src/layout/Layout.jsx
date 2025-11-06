import { Outlet } from "react-router-dom";
import Navbar from "../landingpage/Navbar";
import Footer from "../landingpage/Footer";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default Layout;