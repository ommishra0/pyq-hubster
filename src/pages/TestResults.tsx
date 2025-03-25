
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  HelpCircle, 
  PieChart,
  BarChart,
  Share2,
  Download,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PieChart as RechartsPreChart, Pie, Cell, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { toast } from "sonner";
import { MOCK_TESTS } from "@/data/mockTests";

// Mock questions data
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
    correctAnswer: 1, // Index of the correct option
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

const TestResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [questions] = useState(MOCK_QUESTIONS);
  const [activeTab, setActiveTab] = useState("summary");
  
  useEffect(() => {
    // Get test details
    const testId = parseInt(id || "0");
    const foundTest = MOCK_TESTS.find(test => test.id === testId);
    
    if (foundTest) {
      setTest(foundTest);
    } else {
      toast.error("Test not found");
      navigate("/mock-tests");
      return;
    }
    
    // Get test results from localStorage
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const testResult = savedResults.find((result: any) => result.testId === id);
    
    if (testResult) {
      setResults(testResult);
    } else {
      // For demo purposes, create mock results
      const mockUserAnswers = [1, 1, 0, 3, 1]; // Some correct, some wrong
      
      const correct = mockUserAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      
      const incorrect = mockUserAnswers.filter((answer, index) => 
        answer !== null && answer !== questions[index].correctAnswer
      ).length;
      
      const unanswered = mockUserAnswers.filter(answer => answer === null).length;
      
      const mockResults = {
        testId: id,
        testTitle: foundTest.title,
        totalQuestions: questions.length,
        userAnswers: mockUserAnswers,
        correctAnswers: questions.map(q => q.correctAnswer),
        score: {
          correct,
          incorrect,
          unanswered,
          totalMarks: correct - incorrect * 0.25
        },
        percentageScore: (correct / questions.length) * 100,
        timeTaken: Math.floor(foundTest.duration * 60 * 0.8), // 80% of total time
        date: new Date().toISOString()
      };
      
      setResults(mockResults);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, navigate, questions]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m ${secs}s`;
  };

  const getAnswerStatus = (questionIndex: number) => {
    if (!results) return "unanswered";
    
    const userAnswer = results.userAnswers[questionIndex];
    const correctAnswer = questions[questionIndex].correctAnswer;
    
    if (userAnswer === null) return "unanswered";
    if (userAnswer === correctAnswer) return "correct";
    return "incorrect";
  };

  const handleTryAgain = () => {
    navigate(`/test-taking/${id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Results: ${test?.title}`,
        text: `I scored ${results?.percentageScore.toFixed(1)}% on ${test?.title}!`,
        url: window.location.href,
      })
      .catch(() => {
        toast.info("Sharing is not supported on this device");
      });
    } else {
      toast.info("Sharing is not supported on this device");
    }
  };

  const handleDownload = () => {
    toast.success("Results downloaded successfully!");
  };

  if (!test || !results) {
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

  // Data for charts
  const pieData = [
    { name: "Correct", value: results.score.correct, color: "#10b981" },
    { name: "Incorrect", value: results.score.incorrect, color: "#ef4444" },
    { name: "Unanswered", value: results.score.unanswered, color: "#94a3b8" }
  ];
  
  const COLORS = ["#10b981", "#ef4444", "#94a3b8"];
  
  const subjectPerformance = [
    { name: "Physics", correct: 1, incorrect: 1, total: 2 },
    { name: "Chemistry", correct: 1, incorrect: 1, total: 2 },
    { name: "Mathematics", correct: 0, incorrect: 1, total: 1 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-10">
          <Button 
            variant="outline" 
            onClick={() => navigate("/mock-tests")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Mock Tests
          </Button>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Test Result Header */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">{test.title} - Results</CardTitle>
                <CardDescription>
                  Completed on {new Date(results.date).toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-muted-foreground">Score</h3>
                    <p className="text-2xl font-bold">{results.score.totalMarks.toFixed(2)}/{questions.length}</p>
                    <Progress 
                      value={results.percentageScore} 
                      className="h-2" 
                      indicatorClassName={results.percentageScore >= 60 ? "bg-emerald-500" : results.percentageScore >= 40 ? "bg-amber-500" : "bg-red-500"}
                    />
                    <p className="text-sm">{results.percentageScore.toFixed(1)}%</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-muted-foreground">Correct Answers</h3>
                    <p className="text-2xl font-bold text-emerald-500">{results.score.correct}</p>
                    <p className="text-sm">{((results.score.correct / questions.length) * 100).toFixed(1)}% accuracy</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-muted-foreground">Incorrect Answers</h3>
                    <p className="text-2xl font-bold text-red-500">{results.score.incorrect}</p>
                    <p className="text-sm">-{(results.score.incorrect * 0.25).toFixed(2)} marks deduction</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium text-muted-foreground">Time Taken</h3>
                    <p className="text-2xl font-bold">{formatTime(results.timeTaken)}</p>
                    <p className="text-sm">{((results.timeTaken / (test.duration * 60)) * 100).toFixed(1)}% of allowed time</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button onClick={handleTryAgain}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Results
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Tabs for different result views */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:w-[400px] mb-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPreChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPreChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  {/* Subject Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Subject Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={subjectPerformance}
                          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar name="Correct" dataKey="correct" stackId="a" fill="#10b981" />
                          <Bar name="Incorrect" dataKey="incorrect" stackId="a" fill="#ef4444" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Strengths and Weaknesses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Strengths & Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          Strengths
                        </h3>
                        <ul className="space-y-2 ml-7 list-disc text-muted-foreground">
                          <li>Good performance in Chemical Bonding concepts</li>
                          <li>Strong understanding of basic Physics principles</li>
                          <li>Efficient time management during the test</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-red-500" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-2 ml-7 list-disc text-muted-foreground">
                          <li>Need to work on Calculus questions</li>
                          <li>Review concepts in Quantum Mechanics</li>
                          <li>Practice more difficult problems</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                        Recommended Resources
                      </h3>
                      <ul className="space-y-2 ml-7 list-disc text-muted-foreground">
                        <li>Review our <Link to="#" className="text-primary hover:underline">Calculus Practice Questions</Link></li>
                        <li>Watch the <Link to="#" className="text-primary hover:underline">Quantum Mechanics Masterclass</Link></li>
                        <li>Try the <Link to="#" className="text-primary hover:underline">Advanced Problems in Physics</Link> mock test</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions" className="space-y-6">
                {/* Question Review */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Question Review</CardTitle>
                    <CardDescription>
                      Review all questions and see your answers compared to the correct ones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {questions.map((question, index) => (
                        <div key={index} className="pb-6 border-b last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Question {index + 1}</p>
                              <div className="flex gap-2">
                                <Badge 
                                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                >
                                  {question.subject}
                                </Badge>
                                <Badge 
                                  className={`
                                    ${question.difficulty === 'Easy' 
                                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                                      : question.difficulty === 'Medium'
                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                    }
                                  `}
                                >
                                  {question.difficulty}
                                </Badge>
                              </div>
                            </div>
                            
                            <Badge
                              className={`
                                ${getAnswerStatus(index) === 'correct' 
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                                  : getAnswerStatus(index) === 'incorrect'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }
                              `}
                            >
                              {getAnswerStatus(index) === 'correct' 
                                ? 'Correct' 
                                : getAnswerStatus(index) === 'incorrect'
                                  ? 'Incorrect'
                                  : 'Not Attempted'}
                            </Badge>
                          </div>
                          
                          <h3 className="font-medium mb-4">{question.question}</h3>
                          
                          <div className="space-y-3 mb-4">
                            {question.options.map((option, optIndex) => (
                              <div 
                                key={optIndex}
                                className={`p-3 rounded-lg border ${
                                  optIndex === question.correctAnswer && optIndex === results.userAnswers[index]
                                    ? 'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700'
                                    : optIndex === question.correctAnswer
                                      ? 'bg-emerald-100 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700'
                                      : optIndex === results.userAnswers[index]
                                        ? 'bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700'
                                        : ''
                                }`}
                              >
                                <div className="flex justify-between">
                                  <span>{option}</span>
                                  <div className="flex items-center">
                                    {optIndex === question.correctAnswer && (
                                      <span className="text-emerald-600 dark:text-emerald-400 text-sm flex items-center">
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Correct
                                      </span>
                                    )}
                                    
                                    {optIndex === results.userAnswers[index] && optIndex !== question.correctAnswer && (
                                      <span className="text-red-600 dark:text-red-400 text-sm flex items-center">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Your Answer
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-secondary/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Explanation</h4>
                            <p className="text-muted-foreground">{question.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                {/* Time Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-4">Percentile Ranking</h3>
                        <div className="bg-secondary/50 p-4 rounded-lg text-center mb-4">
                          <p className="text-3xl font-bold mb-2">85<span className="text-xl">th</span></p>
                          <p className="text-muted-foreground">You outperformed 85% of test takers</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Your Score</span>
                              <span className="font-medium">{results.percentageScore.toFixed(1)}%</span>
                            </div>
                            <Progress value={results.percentageScore} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Score</span>
                              <span className="font-medium">62.5%</span>
                            </div>
                            <Progress value={62.5} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Top 10% Score</span>
                              <span className="font-medium">85.0%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">Topic-wise Performance</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Circular Motion</span>
                              <span className="font-medium">100%</span>
                            </div>
                            <Progress value={100} className="h-2 bg-secondary/70" indicatorClassName="bg-emerald-500" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Chemical Bonding</span>
                              <span className="font-medium">50%</span>
                            </div>
                            <Progress value={50} className="h-2 bg-secondary/70" indicatorClassName="bg-amber-500" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Calculus</span>
                              <span className="font-medium">0%</span>
                            </div>
                            <Progress value={0} className="h-2 bg-secondary/70" indicatorClassName="bg-red-500" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Quantum Mechanics</span>
                              <span className="font-medium">0%</span>
                            </div>
                            <Progress value={0} className="h-2 bg-secondary/70" indicatorClassName="bg-red-500" />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="font-medium mb-3">Time Efficiency</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/50 p-3 rounded-lg text-center">
                              <p className="text-2xl font-bold mb-1">{(results.timeTaken / questions.length / 60).toFixed(1)}</p>
                              <p className="text-xs text-muted-foreground">Minutes per question</p>
                            </div>
                            
                            <div className="bg-secondary/50 p-3 rounded-lg text-center">
                              <p className="text-2xl font-bold mb-1">{((test.duration * 60 - results.timeTaken) / 60).toFixed(1)}</p>
                              <p className="text-xs text-muted-foreground">Minutes saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Comparative Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Progress Tracker</CardTitle>
                    <CardDescription>
                      Monitor your performance across multiple tests over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { name: 'Test 1', score: 45 },
                          { name: 'Test 2', score: 52 },
                          { name: 'Test 3', score: 58 },
                          { name: 'Test 4', score: 65 },
                          { name: 'Current', score: results.percentageScore },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#8884d8" name="Score (%)" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestResults;
