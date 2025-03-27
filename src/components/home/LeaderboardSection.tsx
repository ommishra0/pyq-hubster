
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Crown, Medal, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard, type LeaderboardUser } from "@/services/leaderboardService";
import { Skeleton } from "@/components/ui/skeleton";

const LeaderboardSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: topUsers = [], isLoading } = useQuery({
    queryKey: ['leaderboard-home'],
    queryFn: () => fetchLeaderboard('all-time').then(data => data.slice(0, 3)),
  });

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

  const getBadgeType = (position: number) => {
    switch (position) {
      case 1:
        return { badge: "Gold", icon: Crown, position: 1 };
      case 2:
        return { badge: "Silver", icon: Medal, position: 2 };
      case 3:
        return { badge: "Bronze", icon: Medal, position: 3 };
      default:
        return { badge: "Participant", icon: Trophy, position };
    }
  };

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
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`glass-card rounded-xl overflow-hidden transform transition-all duration-500 delay-${index * 100} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="p-6 text-center">
                  <div className="relative mb-6">
                    <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                    <Skeleton className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-32 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                    <div className="text-center">
                      <Skeleton className="h-3 w-16 mx-auto mb-1" />
                      <Skeleton className="h-5 w-8 mx-auto" />
                    </div>
                    <div className="text-center">
                      <Skeleton className="h-3 w-16 mx-auto mb-1" />
                      <Skeleton className="h-5 w-8 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : topUsers.length > 0 ? (
            // Real data
            topUsers.map((performer, index) => {
              const { badge, icon: BadgeIcon, position } = getBadgeType(index + 1);
              
              return (
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
                        {performer.avatar_url ? (
                          <img 
                            src={performer.avatar_url} 
                            alt={performer.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <Trophy className="h-10 w-10 text-primary" />
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${
                        position === 1 
                          ? "bg-amber-500" 
                          : position === 2 
                            ? "bg-slate-400" 
                            : "bg-amber-700"
                      } text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                        {position}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{performer.name}</h3>
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <BadgeIcon className={`h-4 w-4 ${
                        position === 1 
                          ? "text-amber-500" 
                          : position === 2 
                            ? "text-slate-400" 
                            : "text-amber-700"
                      }`} />
                      <span className="text-sm text-muted-foreground">{badge} Badge</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Avg. Score</p>
                        <p className="font-medium">{performer.average_score.toFixed(1)}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Tests Taken</p>
                        <p className="font-medium">{performer.tests_taken}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Empty state - placeholder cards
            Array.from({ length: 3 }).map((_, index) => {
              const { badge, icon: BadgeIcon, position } = getBadgeType(index + 1);
              
              return (
                <div 
                  key={index}
                  className={`glass-card rounded-xl overflow-hidden transform transition-all duration-500 delay-${index * 100} ${
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-background">
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="h-10 w-10 text-primary" />
                        </div>
                      </div>
                      <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${
                        position === 1 
                          ? "bg-amber-500" 
                          : position === 2 
                            ? "bg-slate-400" 
                            : "bg-amber-700"
                      } text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                        {position}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">Future Champion</h3>
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <BadgeIcon className={`h-4 w-4 ${
                        position === 1 
                          ? "text-amber-500" 
                          : position === 2 
                            ? "text-slate-400" 
                            : "text-amber-700"
                      }`} />
                      <span className="text-sm text-muted-foreground">{badge} Badge</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Avg. Score</p>
                        <p className="font-medium">-</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Tests Taken</p>
                        <p className="font-medium">-</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
