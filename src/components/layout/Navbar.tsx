
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
          
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/admin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </Button>
          
          <Button asChild className="rounded-full">
            <Link to="/mock-tests">
              Start Test
            </Link>
          </Button>
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
          <Link 
            to="/admin" 
            className="w-full py-3 text-center text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin
          </Link>
          
          <Button asChild className="w-full mt-4 rounded-full">
            <Link 
              to="/mock-tests"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Test
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
