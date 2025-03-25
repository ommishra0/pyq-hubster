
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, X, User, Moon, Sun, LogIn, LogOut, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if dark mode is enabled
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    
    if (document.documentElement.classList.contains("dark")) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-primary font-semibold text-xl"
        >
          <BookOpen className="h-6 w-6" />
          <span className="animate-fade-in">PYQ Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/subjects" className="text-foreground/80 hover:text-primary transition-colors">
            Subjects
          </Link>
          <Link to="/mock-tests" className="text-foreground/80 hover:text-primary transition-colors">
            Mock Tests
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-primary transition-colors">
            Leaderboard
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboard">
                    <Award className="mr-2 h-4 w-4" />
                    <span>Leaderboard</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild className="rounded-full">
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
              
              <Button asChild className="rounded-full">
                <Link to="/register">
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20 px-6 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-5 items-center">
          <Link 
            to="/" 
            className="w-full py-3 text-center text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/subjects" 
            className="w-full py-3 text-center text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Subjects
          </Link>
          <Link 
            to="/mock-tests" 
            className="w-full py-3 text-center text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Mock Tests
          </Link>
          <Link 
            to="/leaderboard" 
            className="w-full py-3 text-center text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Leaderboard
          </Link>
          
          {isAdmin && (
            <Link 
              to="/admin" 
              className="w-full py-3 text-center text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <>
              <Link 
                to="/login"
                className="w-full py-3 text-center text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              
              <Button asChild className="w-full mt-4">
                <Link 
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
