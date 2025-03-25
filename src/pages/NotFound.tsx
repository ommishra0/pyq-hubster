
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6 max-w-md mx-auto">
            <div className="relative">
              <div className="text-9xl font-bold text-primary/20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Page Not Found</h1>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="rounded-full">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Go to Home</span>
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => window.history.back()} className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Go Back</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
