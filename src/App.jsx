import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Public pages
import AboutUs from "./landingpage/AboutUs.jsx";
import HeroPage from "./landingpage/Heropage.jsx";
import Welcome from "./landingpage/Welcome.jsx";
import Climate from "./landingpage/Climate.jsx";
import Disease from "./landingpage/Disease.jsx";
import Fertilizer from "./landingpage/Fertilizer.jsx";
import Carbon from "./landingpage/Carbon_credit.jsx";
import Chat from "./landingpage/Chat.jsx";
import Hubs from "./landingpage/Hubs.jsx";

// Common layout
import Layout from "./layout/Layout.jsx";

// Role-based simple components (you can replace these later with dashboards)
import UserRoles from "./UserRole.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout for public pages (with Navbar/Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<HeroPage />} />
          <Route
            path="/features"
            element={
              <>
                <Welcome />
                <Climate />
                <Disease />
                <Fertilizer />
                <Carbon />
                <Chat />
                <Hubs />
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* ===== User Role Pages ===== */}
        <Route path="/sprouter/*" element={<UserRoles />} />
        <Route path="/cultivator/*" element={<UserRoles />} />
        <Route path="/consumer/*" element={<UserRoles />} />
        <Route path="/carbon_buyer/*" element={<UserRoles />} />
        <Route path="/hub_employee/*" element={<UserRoles />} />
        <Route path="/rental_provider/*" element={<UserRoles />} />
        <Route path="/seller/*" element={<UserRoles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
