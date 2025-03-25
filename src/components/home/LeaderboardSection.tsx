
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Crown, Medal, ArrowRight } from "lucide-react";

// Mock data - would come from API in real implementation
const TOP_PERFORMERS = [
  {
    id: 1,
    name: "Aarav Sharma",
    score: 98.7,
    tests: 145,
    badge: "Gold",
    icon: Crown,
    position: 1,
    avatar: "https://i.pravatar.cc/150?img=1", 
  },
  {
    id: 2,
    name: "Ananya Patel",
    score: 97.5,
    tests: 132,
    badge: "Silver",
    icon: Medal,
    position: 2,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    score: 96.2,
    tests: 128,
    badge: "Bronze",
    icon: Medal,
    position: 3,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const LeaderboardSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('leaderboard-section');
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
    <section id="leaderboard-section" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl font-bold mb-4">Top Performers</h2>
          <p className="text-muted-foreground">
            See who's leading the pack. Take tests, improve your score, and claim your spot on the leaderboard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TOP_PERFORMERS.map((performer, index) => (
            <div 
              key={performer.id}
              className={`glass-card rounded-xl overflow-hidden hover-scale transform transition-all duration-500 delay-${index * 100} ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="p-6 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-background">
                    <img 
                      src={performer.avatar} 
                      alt={performer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${
                    performer.position === 1 
                      ? "bg-amber-500" 
                      : performer.position === 2 
                        ? "bg-slate-400" 
                        : "bg-amber-700"
                  } text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                    {performer.position}
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{performer.name}</h3>
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  <performer.icon className={`h-4 w-4 ${
                    performer.position === 1 
                      ? "text-amber-500" 
                      : performer.position === 2 
                        ? "text-slate-400" 
                        : "text-amber-700"
                  }`} />
                  <span className="text-sm text-muted-foreground">{performer.badge} Badge</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Avg. Score</p>
                    <p className="font-medium">{performer.score}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Tests Taken</p>
                    <p className="font-medium">{performer.tests}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`flex justify-center transform transition-all duration-500 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <Button asChild className="rounded-full">
            <Link to="/leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>View Full Leaderboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
