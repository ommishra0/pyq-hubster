
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Atom, 
  BookText, 
  FlaskConical, 
  BrainCircuit, 
  Dna, 
  Microscope, 
  Leaf, 
  AtomIcon 
} from "lucide-react";

// Mock data - would come from API in real implementation
const SUBJECTS = [
  {
    id: 1,
    name: "Physics",
    icon: Atom,
    description: "Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics",
    questionCount: 3241,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-900"
  },
  {
    id: 2,
    name: "Mathematics",
    icon: BrainCircuit,
    description: "Algebra, Calculus, Coordinate Geometry, Trigonometry, Vectors",
    questionCount: 4157,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    borderColor: "border-purple-100 dark:border-purple-900"
  },
  {
    id: 3,
    name: "Chemistry",
    icon: FlaskConical,
    description: "Physical Chemistry, Organic Chemistry, Inorganic Chemistry",
    questionCount: 3756,
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    borderColor: "border-green-100 dark:border-green-900"
  },
  {
    id: 4,
    name: "Biology",
    icon: Dna,
    description: "Botany, Zoology, Human Physiology, Ecology, Genetics",
    questionCount: 5230,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    borderColor: "border-amber-100 dark:border-amber-900"
  },
];

const SubjectsSection = () => {
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

    const element = document.getElementById('subjects-section');
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
    <section id="subjects-section" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-12 transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl font-bold mb-4">Explore Subjects</h2>
          <p className="text-muted-foreground">
            Browse through our comprehensive collection of previous year questions 
            organized by subjects to focus your preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECTS.map((subject, index) => (
            <div 
              key={subject.id}
              className={`glass-card border ${subject.borderColor} rounded-xl overflow-hidden hover-scale transform transition-all duration-500 delay-${index * 100} ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="p-6 flex gap-5">
                <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center flex-shrink-0`}>
                  <subject.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{subject.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {subject.questionCount.toLocaleString()} questions
                    </span>
                    
                    <Button asChild variant="ghost" size="sm" className="gap-1 hover:gap-2 transition-all">
                      <Link to={`/subjects/${subject.id}`}>
                        <span>Explore</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`flex justify-center mt-10 transform transition-all duration-500 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <Button asChild variant="outline" size="lg">
            <Link to="/subjects">View All Subjects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
