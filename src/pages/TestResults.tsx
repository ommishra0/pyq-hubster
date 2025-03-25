import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronLeft,
  Download,
  Share2,
  BarChart3,
  Clock,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_TESTS } from "@/data/mockTests";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TestResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState<any>(null);
  const [test, setTest] = useState<any>(null);

  useEffect(() => {
    // Retrieve test results from localStorage
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    const foundResult = savedResults.find((result: any) => result.testId === id);
    setTestResult(foundResult);

    // Find the test details
    const testId = parseInt(id || "0");
    const foundTest = MOCK_TESTS.find(test => test.id === testId);
    setTest(foundTest);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [id]);

  if (!testResult || !test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Loading...</h1>
            <p className="text-muted-foreground">Fetching results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { 
    testTitle,
    totalQuestions,
    userAnswers,
    correctAnswers,
    score,
    percentageScore,
    timeTaken,
    date
  } = testResult;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-secondary/10 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{testTitle}</h1>
                <p className="text-muted-foreground">
                  Completed on {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/mock-tests")}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Tests
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Test Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{score.correct}</p>
                      <p className="text-sm text-muted-foreground">Correct Answers</p>
                    </div>
                    <div className="text-center">
                      <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{score.incorrect}</p>
                      <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                    </div>
                    <div className="text-center">
                      <HelpCircle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{score.unanswered}</p>
                      <p className="text-sm text-muted-foreground">Unanswered</p>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{score.totalMarks.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Total Marks</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <p className="flex justify-between items-center">
                      <span>Percentage Score:</span>
                      <span className="font-bold">{percentageScore.toFixed(2)}%</span>
                    </p>
                    <Progress value={percentageScore} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Test Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span>{totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Taken:</span>
                    <span>{formatTime(timeTaken)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Difficulty:</span>
                    <Badge className={`
                        ${test?.difficulty === 'Easy' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                          : test?.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }
                      `}>{test?.difficulty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Subject:</span>
                    <span>{test?.subject}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-muted-foreground">
                    Here's a detailed overview of your performance in the test.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Correct Answers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-500">{score.correct}</p>
                      <p className="text-sm text-muted-foreground">
                        You answered {score.correct} questions correctly.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Incorrect Answers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-red-500">{score.incorrect}</p>
                      <p className="text-sm text-muted-foreground">
                        You answered {score.incorrect} questions incorrectly.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analysis">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Analysis</h2>
                  <p className="text-muted-foreground">
                    Detailed analysis of your answers and performance.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="leaderboard">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
                  <p className="text-muted-foreground">
                    See how you rank among other test takers.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestResults;
