
import { Link } from "react-router-dom";
import { BookOpen, GitHub, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-12 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>PYQ Hub</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your ultimate destination for JEE and NEET preparation with previous year questions and mock tests.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/mock-tests" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jee-main" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  JEE Main
                </Link>
              </li>
              <li>
                <Link to="/jee-advanced" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  JEE Advanced
                </Link>
              </li>
              <li>
                <Link to="/neet" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  NEET
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Connect With Us</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PYQ Hub. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
