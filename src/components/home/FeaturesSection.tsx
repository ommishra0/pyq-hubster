
import { useEffect, useState } from "react";
import { Clock, BookOpen, LineChart, Sparkles, Lightbulb, Heart } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Question Bank",
    description: "Access thousands of previous year questions from JEE Main, JEE Advanced, and NEET exams."
  },
  {
    icon: Clock,
    title: "Timed Mock Tests",
    description: "Experience real exam conditions with our timed tests that simulate the actual examination environment."
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics, identify strengths and areas for improvement."
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Receive personalized question recommendations based on your performance and learning patterns."
  },
  {
    icon: Lightbulb,
    title: "Detailed Solutions",
    description: "Learn from comprehensive, step-by-step solutions for every question in our database."
  },
  {
    icon: Heart,
    title: "Bookmark & Save",
    description: "Save important questions for later review and build your own custom revision lists."
  }
];

const FeaturesSection = () => {
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

    const element = document.getElementById('features-section');
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
    <section id="features-section" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground">
            Discover all the tools and resources we offer to help you prepare effectively for your exams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 transform transition-all duration-500 ${
                isVisible 
                  ? `opacity-100 translate-y-0 delay-${index * 100}` 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
