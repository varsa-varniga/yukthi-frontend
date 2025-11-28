// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
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

// Authentication
import AuthSystem from "./authentication/AuthSystem.jsx";
import GLogin from "./authentication/GLogin.jsx";
import RoleSelection from "./authentication/RoleSelection.jsx";
import SprouterDashboard from "./authentication/SprouterDashboard.jsx";
import CultivatorDashboard from "./authentication/CultivatorDashboard.jsx";

// Land Leasing
import LandHome from "./landleasing/LandHome.jsx";
import ListYourLand from "./landleasing/landlist/ListYourLand.jsx";
import FileExplorerDemo from "./landleasing/FileExplorerDemo/FileExplorerDemo.jsx";
import DashboardHome from "./landleasing/dashboard/Home.jsx";
import MyLease from "./landleasing/dashboard/MyLease.jsx";
import SavedLand from "./landleasing/dashboard/SavedLand.jsx";
import Document from "./landleasing/dashboard/Document.jsx";
import ViewAgreement from "./landleasing/dashboard/ViewAgreement.jsx";
import Explore from "./landleasing/pages/Explore.jsx";

// Soil Connect & Ecommerce
import SoilConnect from "./soilconnect/SoilConnect.jsx";
import Ecom from "./ecommerce/Ecom.jsx";

// Carbon Credit
import FarmerCarbonCreditCalculator from "./carboncredit/CarbonCreditMonetization.jsx";

// Layout
import Layout from "./layout/Layout.jsx";

// CropCircle App Components
import { AuthProvider } from "./cropcircle/context/AuthContext";
import ProtectedRoute from "./cropcircle/components/ProtectedRoute";
import BottomNav from "./cropcircle/components/BottomNav";
import theme from "./cropcircle/theme/theme";

// Import CropCircle pages
import FeedPage from "./cropcircle/pages/FeedPage";
import ProfilePage from "./cropcircle/pages/ProfilePage";
import UserFeedPage from "./cropcircle/pages/UserFeedPage";
import Login from "./cropcircle/pages/LoginPage";
import SignUpPage from "./cropcircle/pages/SignUpPage";
import CompleteProfilePage from "./cropcircle/pages/CompleteProfilePage";
import NotificationsPage from "./cropcircle/pages/NotificationsPage";

// Firebase Auth Provider
import { AuthProvider as FirebaseAuthProvider } from "./context/AuthContext";

// Layout for all protected pages
const ProtectedLayout = ({ children }) => (
  <>
    {children}
    <BottomNav />
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FirebaseAuthProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* PUBLIC PAGES */}
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

              {/* AUTH */}
              <Route path="/login" element={<AuthSystem />} />
              <Route path="/glogin" element={<GLogin />} />
              <Route path="/select-role" element={<RoleSelection />} />

              {/* DASHBOARDS */}
              <Route path="/sprouter" element={<SprouterDashboard />} />
              <Route path="/cultivator" element={<CultivatorDashboard />} />

              {/* LAND LEASING */}
              <Route path="/land-leasing" element={<LandHome />} />
              <Route path="/list-land" element={<ListYourLand />} />
              <Route path="/file-explorer" element={<FileExplorerDemo />} />
              <Route path="/explore" element={<Explore />} />

              {/* SOIL CONNECT */}
              <Route path="/soil-connect" element={<SoilConnect />} />

              <Route path="/ecom" element={<Ecom />} />

              {/* CARBON CREDIT - PROTECTED ROUTE */}
              <Route
                path="/carbon-credit"
                element={<FarmerCarbonCreditCalculator />}
              />

              {/* Dashboard shell with nested routes */}
              <Route path="/dashboard" element={<DashboardHome />}>
                <Route index element={<MyLease />} />
                <Route path="saved" element={<SavedLand />} />
                <Route path="documents" element={<Document />} />
              </Route>

              <Route path="/view-agreement" element={<ViewAgreement />} />

              {/* CROPCIRCLE ROUTES */}
              {/* Public CropCircle Routes */}
              <Route path="/cropcircle/register" element={<SignUpPage />} />
              <Route path="/cropcircle" element={<Login />} />
              <Route path="/cropcircle/login" element={<Login />} />
              <Route
                path="/cropcircle/complete-profile"
                element={<CompleteProfilePage />}
              />

              {/* Protected CropCircle Routes */}
              <Route
                path="/cropcircle/home"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <FeedPage />
                    </ProtectedLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cropcircle/notifications"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <NotificationsPage />
                    </ProtectedLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cropcircle/profile"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <ProfilePage />
                    </ProtectedLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cropcircle/profile/:userId/feed"
                element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <UserFeedPage />
                    </ProtectedLayout>
                  </ProtectedRoute>
                }
              />

              {/* Optional catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FirebaseAuthProvider>
    </ThemeProvider>
  );
}

export default App;
