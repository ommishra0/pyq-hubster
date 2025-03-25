
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Plus, 
  Users, 
  Settings, 
  LogOut,
  Gauge
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Extract the current tab from the pathname
    const path = location.pathname.split("/").pop();
    if (path && path !== "admin") {
      setActiveTab(path);
    } else {
      setActiveTab("dashboard");
    }
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">PYQ Hub Admin</span>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <nav className="flex flex-col p-4 space-y-1">
            <Link
              to="/admin"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "dashboard"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Gauge className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/admin/mock-tests"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "mock-tests"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <FileText className="h-5 w-5" />
              Mock Tests
            </Link>
            <Link
              to="/admin/pyqs"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "pyqs"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Plus className="h-5 w-5" />
              Previous Year Questions
            </Link>
            <Link
              to="/admin/books"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "books"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <BookOpen className="h-5 w-5" />
              Books Questions
            </Link>
            <Link
              to="/admin/users"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "users"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Users className="h-5 w-5" />
              Users
            </Link>
            <Link
              to="/admin/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === "settings"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Mobile Nav */}
        <div className="md:hidden sticky top-16 z-40 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="flex p-2 gap-2">
            <Link
              to="/admin"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "dashboard"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Gauge className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/mock-tests"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "mock-tests"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <FileText className="h-4 w-4" />
              Mock Tests
            </Link>
            <Link
              to="/admin/pyqs"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "pyqs"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Plus className="h-4 w-4" />
              PYQs
            </Link>
            <Link
              to="/admin/books"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "books"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Books
            </Link>
            <Link
              to="/admin/users"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "users"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              to="/admin/settings"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === "settings"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
