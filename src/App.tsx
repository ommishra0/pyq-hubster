
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MockTests from "./pages/MockTests";
import MockTestDetail from "./pages/MockTestDetail";
import TestTaking from "./pages/TestTaking";
import TestResults from "./pages/TestResults";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from "./pages/admin/Dashboard";
import AdminMockTests from "./pages/admin/MockTests";
import AdminPYQs from "./pages/admin/PYQs";
import AdminBooks from "./pages/admin/Books";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => {
  // Check for user preference (dark mode)
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              
              {/* Protected routes (require authentication) */}
              <Route path="/mock-tests" element={
                <ProtectedRoute>
                  <MockTests />
                </ProtectedRoute>
              } />
              <Route path="/mock-tests/:id" element={
                <ProtectedRoute>
                  <MockTestDetail />
                </ProtectedRoute>
              } />
              <Route path="/test-taking/:id" element={
                <ProtectedRoute>
                  <TestTaking />
                </ProtectedRoute>
              } />
              <Route path="/test-results/:id" element={
                <ProtectedRoute>
                  <TestResults />
                </ProtectedRoute>
              } />

              {/* Admin routes (require admin privileges) */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="mock-tests" element={<AdminMockTests />} />
                <Route path="pyqs" element={<AdminPYQs />} />
                <Route path="books" element={<AdminBooks />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
