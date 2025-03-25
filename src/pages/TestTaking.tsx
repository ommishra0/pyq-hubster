import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag, 
  CheckCircle2, 
  HelpCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { MOCK_TESTS } from "@/data/mockTests";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "A particle is moving in a circular path of radius r with constant speed v. The magnitude of the velocity is:",
    options: [
      "Zero",
      "v",
      "v/r",
      "v²/r"
    ],
    correctAnswer: 1,
    explanation: "The magnitude of velocity is constant and equal to the speed v when moving in a circular path.",
    subject: "Physics",
    chapter: "Circular Motion",
    difficulty: "Medium"
  },
  {
    id: 2,
    question: "What is the hybridization of carbon in benzene?",
    options: [
      "sp",
      "sp²",
      "sp³",
      "sp³d"
    ],
    correctAnswer: 1,
    explanation: "Carbon atoms in benzene are sp² hybridized, which creates the planar hexagonal structure.",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "If f(x) = sin⁻¹(cos x) for 0 ≤ x ≤ π, then f'(π/3) equals:",
    options: [
      "1",
      "-1",
      "0",
      "√3"
    ],
    correctAnswer: 1,
    explanation: "For 0 ≤ x ≤ π, f(x) = sin⁻¹(cos x) = π/2 - x. Therefore, f'(x) = -1 for all x in the domain.",
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "Hard"
  },
  {
    id: 4,
    question: "Which of the following represents Heisenberg's Uncertainty Principle?",
    options: [
      "ΔE·Δt ≥ h/4π",
      "Δx·Δp ≥ h/4π",
      "ΔE = mc²",
      "E = hν"
    ],
    correctAnswer: 1,
    explanation: "Heisenberg's Uncertainty Principle states that the product of uncertainty in position (Δx) and momentum (Δp) is greater than or equal to h/4π.",
    subject: "Physics",
    chapter: "Quantum Mechanics",
    difficulty: "Hard"
  },
  {
    id: 5,
    question: "The hydrogen bonding is maximum in:",
    options: [
      "Alcohol",
      "Carboxylic acid",
      "Amine",
      "Ether"
    ],
    correctAnswer: 1,
    explanation: "Carboxylic acids can form dimers through hydrogen bonding, which makes their hydrogen bonding stronger than alcohols.",
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    difficulty: "Medium"
  },
];

const TestTaking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<any>(null);
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(MOCK_QUESTIONS.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(Array(MOCK_QUESTIONS.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isTimeupDialogOpen, setIsTimeupDialogOpen] = useState(false);
  const [isQuitDialogOpen, setIsQuitDialogOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [savedAnswers, setSavedAnswers] = useLocalStorage(`test-${id}-answers`, userAnswers);
  const [savedMarked, setSavedMarked] = useLocalStorage(`test-${id}-marked`, markedForReview);
  const [savedTime, setSavedTime] = useLocalStorage(`test-${id}-time`, 0);

  useEffect(() => {
    const testId = parseInt(id || "0");
    const foundTest = MOCK_TESTS.find(test => test.id === testId);
    
    if (foundTest) {
      setTest(foundTest);
      setTimeLeft(foundTest.duration * 60);
      
      if (savedAnswers.some(answer => answer !== null)) {
        setUserAnswers(savedAnswers);
        setMarkedForReview(savedMarked);
        
        const elapsedSeconds = savedTime;
        const remainingTime = Math.max(0, foundTest.duration * 60 - elapsedSeconds);
        setTimeLeft(remainingTime);
        
        toast.info("Your progress has been restored");
      }
    } else {
      toast.error("Test not found");
      navigate("/mock-tests");
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        setSavedTime(foundTest.duration * 60 - newTime);
        if (newTime <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimeupDialogOpen(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [id, navigate, savedAnswers, savedMarked, savedTime, setSavedTime]);

  useEffect(() => {
    if (test && !testSubmitted) {
      setSavedAnswers(userAnswers);
      setSavedMarked(markedForReview);
    }
  }, [userAnswers, markedForReview, test, testSubmitted, setSavedAnswers, setSavedMarked]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (hours > 0 || mins > 0) parts.push(`${mins}m`);
    parts.push(`${secs}s`);
    
    return parts.join(' ');
  };

  const handleAnswer = (optionIndex: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleMarkForReview = () => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[currentQuestionIndex] = !newMarkedForReview[currentQuestionIndex];
    setMarkedForReview(newMarkedForReview);
    
    if (newMarkedForReview[currentQuestionIndex]) {
      toast.info("Question marked for review");
    } else {
      toast.info("Question unmarked from review");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsSubmitDialogOpen(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTestSubmitted(true);
    
    setSavedAnswers(Array(questions.length).fill(null));
    setSavedMarked(Array(questions.length).fill(false));
    setSavedTime(0);
    
    const score = calculateScore();
    
    const testResults = {
      testId: id,
      testTitle: test?.title,
      totalQuestions: questions.length,
      userAnswers,
      correctAnswers: questions.map(q => q.correctAnswer),
      score,
      percentageScore: (score.totalMarks / (questions.length * 1)) * 100,
      timeTaken: test?.duration * 60 - timeLeft,
      date: new Date().toISOString()
    };
    
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    savedResults.push(testResults);
    localStorage.setItem('testResults', JSON.stringify(savedResults));
    
    navigate(`/test-results/${id}`);
  };

  const handleTimeUp = () => {
    setIsTimeupDialogOpen(false);
    handleSubmitTest();
  };

  const handleQuit = () => {
    setIsQuitDialogOpen(false);
    navigate(`/mock-tests/${id}`);
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    userAnswers.forEach((answer, index) => {
      if (answer === null) {
        unanswered++;
      } else if (answer === questions[index].correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    
    const totalMarks = correct * 1 - incorrect * 0.25;
    
    return {
      correct,
      incorrect,
      unanswered,
      totalMarks
    };
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!test) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 flex flex-col">
      <header className="py-4 px-6 bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsQuitDialogOpen(true)}
            >
              <X className="mr-2 h-4 w-4" />
              Quit Test
            </Button>
            
            <h1 className="text-lg font-medium hidden md:block">{test.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Progress value={(userAnswers.filter(a => a !== null).length / questions.length) * 100} className="w-28 md:w-48 h-2" />
            <span className="text-sm text-muted-foreground">
              {userAnswers.filter(a => a !== null).length}/{questions.length}
            </span>
            
            <div className={`flex items-center gap-2 bg-card px-3 py-1.5 rounded-md border ${
              timeLeft < 300 ? "border-red-500 text-red-500" : "border-input"
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            
            <Button 
              onClick={() => setIsSubmitDialogOpen(true)}
              size="sm"
              className={timeLeft < 300 ? "animate-pulse" : ""}
            >
              Submit
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
                  <div className="flex gap-2">
                    <Badge 
                      className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {currentQuestion.subject}
                    </Badge>
                    <Badge 
                      className={`
                        ${currentQuestion.difficulty === 'Easy' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                          : currentQuestion.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }
                      `}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant={markedForReview[currentQuestionIndex] ? "secondary" : "outline"} 
                  size="sm"
                  onClick={handleMarkForReview}
                >
                  <Flag className={`mr-2 h-4 w-4 ${markedForReview[currentQuestionIndex] ? "text-amber-500" : ""}`} />
                  {markedForReview[currentQuestionIndex] ? "Marked" : "Mark for Review"}
                </Button>
              </div>
              
              <div className="py-4">
                <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>
                
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        userAnswers[currentQuestionIndex] === index 
                          ? "bg-primary/5 border-primary" 
                          : "hover:bg-secondary/50"
                      }`}
                      onClick={() => handleAnswer(index)}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        userAnswers[currentQuestionIndex] === index 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-muted-foreground"
                      }`}>
                        {userAnswers[currentQuestionIndex] === index && (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="md:block">
          <div className="bg-card rounded-lg border p-4 sticky top-24">
            <h3 className="font-medium mb-4">Question Palette</h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`h-10 w-10 p-0 ${
                    currentQuestionIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                  } ${
                    userAnswers[index] !== null 
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300" 
                      : markedForReview[index]
                        ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300"
                        : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span>Answered: {userAnswers.filter(a => a !== null).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span>Marked for Review: {markedForReview.filter(Boolean).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <span>Not Visited: {userAnswers.filter((a, i) => a === null && !markedForReview[i]).length}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={() => setIsSubmitDialogOpen(true)}
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-secondary/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{userAnswers.filter(a => a !== null).length}</p>
                <p className="text-sm text-muted-foreground">Answered</p>
              </div>
              
              <div className="bg-secondary/50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{userAnswers.filter(a => a === null).length}</p>
                <p className="text-sm text-muted-foreground">Unanswered</p>
              </div>
            </div>
            
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-3 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm">
                You still have {formatTime(timeLeft)} left. Are you sure you want to submit now?
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Continue Test
            </Button>
            <Button onClick={handleSubmitTest}>
              Submit Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isTimeupDialogOpen} onOpenChange={setIsTimeupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
            <DialogDescription>
              Your test time has expired. Your answers will be submitted automatically.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <Clock className="h-16 w-16 mx-auto text-primary mb-4" />
            <p className="mb-2">Test completed: {test.title}</p>
            <p className="text-sm text-muted-foreground">
              You've answered {userAnswers.filter(a => a !== null).length} out of {questions.length} questions.
            </p>
          </div>
          
          <DialogFooter>
            <Button onClick={handleTimeUp} className="w-full">
              View Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isQuitDialogOpen} onOpenChange={setIsQuitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quit Test?</DialogTitle>
            <DialogDescription>
              Are you sure you want to quit? Your progress will be saved, but you'll need to restart the test.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm">
                You've answered {userAnswers.filter(a => a !== null).length} out of {questions.length} questions.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuitDialogOpen(false)}>
              Continue Test
            </Button>
            <Button variant="destructive" onClick={handleQuit}>
              Quit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestTaking;
