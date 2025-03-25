
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Book, Clock, Medal } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transform transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}>
            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm">
              <span className="text-primary font-medium">New</span>
              <span className="ml-1 text-muted-foreground">JEE Advanced 2023 Papers Added</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
              Master Your Exams with Previous Year Questions
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              Access thousands of JEE and NEET previous year questions, take mock tests, and track your progress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/mock-tests" className="flex items-center gap-2">
                  Start Mock Test
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild className="rounded-full">
                <Link to="/subjects" className="flex items-center gap-2">
                  Browse Subjects
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <span className="text-sm">10K+ Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">Timed Tests</span>
              </div>
              <div className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-primary" />
                <span className="text-sm">Leaderboards</span>
              </div>
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-700 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-20"></div>
            <div className="glass-card relative rounded-3xl p-6 md:p-8 overflow-hidden">
              <div className="bg-secondary/80 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Quick Search</h3>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="bg-background rounded-lg p-3 flex items-center gap-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search questions, topics..." 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Trending Topics</h3>
                {[
                  { name: "JEE Main Physics Mechanics", count: 342 },
                  { name: "NEET Organic Chemistry", count: 287 },
                  { name: "JEE Advanced Calculus", count: 216 },
                  { name: "NEET Human Physiology", count: 193 },
                ].map((topic, index) => (
                  <div 
                    key={index}
                    className="bg-background/60 hover:bg-background rounded-lg p-3 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium">{topic.name}</span>
                    <span className="text-xs text-muted-foreground">{topic.count} questions</span>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
