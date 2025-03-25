
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const MockTestSection = () => {
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

    const element = document.getElementById('mocktest-section');
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
    <section id="mocktest-section" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}>
            <h2 className="text-3xl font-bold mb-4">Test Your Knowledge with Mock Tests</h2>
            <p className="text-muted-foreground mb-6">
              Simulate the real exam experience with our timed mock tests. Get instant feedback, 
              performance analytics, and improve your test-taking strategy.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Timed tests that simulate real exam conditions",
                "Detailed solutions and explanations for each question",
                "Performance analytics to identify strengths and weaknesses",
                "Compare your score with other test-takers",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="rounded-full">
              <Link to="/mock-tests" className="flex items-center gap-2">
                Start Mock Test
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className={`relative transform transition-all duration-700 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-20"></div>
            
            <div className="glass-card relative rounded-3xl p-6 md:p-8 overflow-hidden">
              <h3 className="font-medium text-xl mb-6">Featured Mock Tests</h3>
              
              {[
                {
                  id: 1,
                  title: "JEE Main 2023 Full Mock Test",
                  type: "JEE Main",
                  duration: 180,
                  questions: 90,
                  participants: 12645,
                },
                {
                  id: 2,
                  title: "NEET 2023 Biology Section",
                  type: "NEET",
                  duration: 60,
                  questions: 45,
                  participants: 8721,
                },
                {
                  id: 3,
                  title: "JEE Advanced Mathematics",
                  type: "JEE Advanced",
                  duration: 90,
                  questions: 30,
                  participants: 5426,
                }
              ].map((test, index) => (
                <div 
                  key={test.id}
                  className={`bg-background/60 hover:bg-background rounded-lg p-4 flex flex-col mb-4 transition-colors ${
                    isVisible ? `animate-fade-up animation-delay-${index * 200}` : "opacity-0"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{test.title}</h4>
                      <span className="text-xs text-muted-foreground">{test.type}</span>
                    </div>
                    <span className="text-xs font-medium bg-secondary px-2.5 py-1 rounded-full">
                      {test.duration} min
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{test.questions} questions</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      <span>{test.participants.toLocaleString()} taken</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 text-center">
                <Button variant="outline" asChild size="sm">
                  <Link to="/mock-tests">View All Tests</Link>
                </Button>
              </div>
              
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockTestSection;
