
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock, BarChart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - would come from API in real implementation
const TRENDING_PYQS = [
  {
    id: 1,
    title: "JEE Main 2023 Physics Set A",
    category: "JEE Main",
    subject: "Physics",
    questions: 30,
    difficulty: "Medium",
    avgTime: "45 min",
    attempts: 12420,
    thumbnailColor: "bg-blue-50 dark:bg-blue-950"
  },
  {
    id: 2,
    title: "NEET 2023 Biology Section",
    category: "NEET",
    subject: "Biology",
    questions: 45,
    difficulty: "Hard",
    avgTime: "60 min",
    attempts: 9875,
    thumbnailColor: "bg-green-50 dark:bg-green-950"
  },
  {
    id: 3,
    title: "JEE Advanced 2023 Mathematics",
    category: "JEE Advanced",
    subject: "Mathematics",
    questions: 25,
    difficulty: "Very Hard",
    avgTime: "55 min",
    attempts: 7865,
    thumbnailColor: "bg-purple-50 dark:bg-purple-950"
  },
  {
    id: 4,
    title: "JEE Main 2022 Chemistry Set B",
    category: "JEE Main",
    subject: "Chemistry",
    questions: 30,
    difficulty: "Medium",
    avgTime: "50 min",
    attempts: 10532,
    thumbnailColor: "bg-amber-50 dark:bg-amber-950"
  },
  {
    id: 5,
    title: "NEET 2022 Physics Section",
    category: "NEET",
    subject: "Physics",
    questions: 45,
    difficulty: "Medium",
    avgTime: "58 min",
    attempts: 8752,
    thumbnailColor: "bg-rose-50 dark:bg-rose-950"
  },
];

const TrendingPYQSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const visibleItems = 3;
  const maxIndex = TRENDING_PYQS.length - visibleItems;
  
  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trending-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="trending-section"
      className="py-16 bg-secondary/30"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex justify-between items-center mb-10 transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div>
            <h2 className="text-3xl font-bold">Trending PYQs</h2>
            <p className="text-muted-foreground mt-2">Most popular previous year questions</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {TRENDING_PYQS.map((pyq) => (
              <div 
                key={pyq.id}
                className={`min-w-[calc(100%/3-1rem)] flex-shrink-0 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ 
                  animationDelay: `${(pyq.id % visibleItems) * 100}ms`,
                  display: 'block' // Force display for mobile
                }}
              >
                <div className="glass-card h-full rounded-xl overflow-hidden hover-scale">
                  <div className={`h-32 flex items-center justify-center ${pyq.thumbnailColor}`}>
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                        {pyq.category}
                      </span>
                      <span className="text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                        {pyq.subject}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-3">{pyq.title}</h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {pyq.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {pyq.avgTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {pyq.questions} questions
                      </span>
                      <Button asChild variant="ghost" size="sm" className="gap-1 hover:gap-2 transition-all">
                        <Link to={`/pyq/${pyq.id}`}>
                          <span>View</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingPYQSection;
