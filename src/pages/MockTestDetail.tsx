
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Calendar, 
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { MOCK_TESTS } from "@/data/mockTests";

const MockTestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Finding the test by ID
    const testId = parseInt(id || "0");
    const foundTest = MOCK_TESTS.find(test => test.id === testId);
    
    if (foundTest) {
      setTest(foundTest);
    } else {
      toast.error("Test not found");
      setTimeout(() => navigate("/mock-tests"), 2000);
    }
    
    setLoading(false);

    // Animation effect
    setIsVisible(true);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleStartTest = () => {
    toast.success("Starting test...");
    navigate(`/test-taking/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-secondary rounded-md mb-4"></div>
            <div className="h-4 w-48 bg-secondary/60 rounded-md"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Test Not Found</h1>
            <p className="text-muted-foreground mb-6">Redirecting to mock tests...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-10">
          <Button 
            variant="outline" 
            onClick={() => navigate("/mock-tests")}
            className={`mb-8 transform transition-all duration-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mock Tests
          </Button>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            {/* Test details section */}
            <div className="md:col-span-2">
              <Card className="glass-card h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      className={`${
                        test.type === 'JEE Main' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : test.type === 'JEE Advanced'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {test.type}
                    </Badge>
                    
                    <Badge
                      className={`${
                        test.difficulty === 'Easy' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                          : test.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {test.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl">{test.title}</CardTitle>
                  <CardDescription className="mt-2">{test.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-muted-foreground">{test.duration} minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Questions</p>
                          <p className="text-muted-foreground">{test.questions} total</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Participants</p>
                          <p className="text-muted-foreground">{test.participants.toLocaleString()} students</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Last Updated</p>
                          <p className="text-muted-foreground">{new Date(test.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-3">Subjects Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {test.subjects.map((subject: string) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full text-lg py-6" onClick={handleStartTest}>
                    Start Test Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Instructions and tips section */}
            <div>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle>Test Instructions</CardTitle>
                  <CardDescription>Read carefully before starting</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p>The test contains {test.questions} questions to be completed in {test.duration} minutes.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p>Each question in this test has only one correct answer.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p>You can mark questions for review and return to them later.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <p>Negative marking: 1 mark for correct answer, -0.25 for incorrect answers.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <p>The test will be automatically submitted once the time is up.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p>Performance analytics will be available immediately after submission.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockTestDetail;
