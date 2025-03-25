
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Trophy, 
  Medal, 
  User, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  Users, 
  Filter, 
  Search,
  ArrowUpDown,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_TESTS } from "@/data/mockTests";

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  {
    id: 1,
    rank: 1,
    name: "Aditya Sharma",
    avatarUrl: "",
    score: 98.5,
    timeTaken: 95.5,
    testsTaken: 42,
    highestScore: 100,
    lastActive: "2023-09-15",
    rankChange: 0,
    city: "Delhi",
    subjects: {
      Physics: 96.7,
      Chemistry: 97.2,
      Mathematics: 99.1
    }
  },
  {
    id: 2,
    rank: 2,
    name: "Priya Patel",
    avatarUrl: "",
    score: 96.8,
    timeTaken: 112.3,
    testsTaken: 38,
    highestScore: 99.5,
    lastActive: "2023-09-14",
    rankChange: 1,
    city: "Mumbai",
    subjects: {
      Physics: 95.2,
      Chemistry: 98.4,
      Mathematics: 97.1
    }
  },
  {
    id: 3,
    rank: 3,
    name: "Rahul Gupta",
    avatarUrl: "",
    score: 95.2,
    timeTaken: 103.7,
    testsTaken: 45,
    highestScore: 98.6,
    lastActive: "2023-09-16",
    rankChange: -1,
    city: "Bangalore",
    subjects: {
      Physics: 94.8,
      Chemistry: 96.9,
      Mathematics: 96.3
    }
  },
  {
    id: 4,
    rank: 4,
    name: "Aryan Singh",
    avatarUrl: "",
    score: 94.7,
    timeTaken: 118.2,
    testsTaken: 36,
    highestScore: 97.8,
    lastActive: "2023-09-13",
    rankChange: 2,
    city: "Chennai",
    subjects: {
      Physics: 93.5,
      Chemistry: 95.7,
      Mathematics: 96.8
    }
  },
  {
    id: 5,
    rank: 5,
    name: "Neha Verma",
    avatarUrl: "",
    score: 93.9,
    timeTaken: 108.1,
    testsTaken: 39,
    highestScore: 97.2,
    lastActive: "2023-09-15",
    rankChange: 0,
    city: "Hyderabad",
    subjects: {
      Physics: 92.8,
      Chemistry: 94.6,
      Mathematics: 95.4
    }
  },
  {
    id: 6,
    rank: 6,
    name: "Rohit Kumar",
    avatarUrl: "",
    score: 93.1,
    timeTaken: 109.6,
    testsTaken: 41,
    highestScore: 96.9,
    lastActive: "2023-09-12",
    rankChange: -2,
    city: "Pune",
    subjects: {
      Physics: 91.9,
      Chemistry: 93.8,
      Mathematics: 94.7
    }
  },
  {
    id: 7,
    rank: 7,
    name: "Shreya Joshi",
    avatarUrl: "",
    score: 92.4,
    timeTaken: 115.3,
    testsTaken: 37,
    highestScore: 96.1,
    lastActive: "2023-09-14",
    rankChange: 1,
    city: "Kolkata",
    subjects: {
      Physics: 91.2,
      Chemistry: 92.9,
      Mathematics: 93.8
    }
  },
  {
    id: 8,
    rank: 8,
    name: "Vikram Ahuja",
    avatarUrl: "",
    score: 91.8,
    timeTaken: 110.7,
    testsTaken: 40,
    highestScore: 95.7,
    lastActive: "2023-09-11",
    rankChange: -1,
    city: "Ahmedabad",
    subjects: {
      Physics: 90.6,
      Chemistry: 91.7,
      Mathematics: 92.9
    }
  },
  {
    id: 9,
    rank: 9,
    name: "Isha Reddy",
    avatarUrl: "",
    score: 91.2,
    timeTaken: 112.9,
    testsTaken: 35,
    highestScore: 95.2,
    lastActive: "2023-09-16",
    rankChange: 0,
    city: "Jaipur",
    subjects: {
      Physics: 89.7,
      Chemistry: 90.8,
      Mathematics: 91.6
    }
  },
  {
    id: 10,
    rank: 10,
    name: "Karan Malhotra",
    avatarUrl: "",
    score: 90.7,
    timeTaken: 117.6,
    testsTaken: 38,
    highestScore: 94.9,
    lastActive: "2023-09-15",
    rankChange: 2,
    city: "Lucknow",
    subjects: {
      Physics: 88.9,
      Chemistry: 89.5,
      Mathematics: 90.8
    }
  }
];

// Mock user info (for current user's ranking)
const CURRENT_USER = {
  id: 42,
  rank: 127,
  name: "Your Name",
  avatarUrl: "",
  score: 82.5,
  timeTaken: 128.9,
  testsTaken: 12,
  highestScore: 89.7,
  lastActive: "2023-09-14",
  rankChange: 5,
  city: "Mumbai",
  subjects: {
    Physics: 78.4,
    Chemistry: 82.6,
    Mathematics: 86.3
  }
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const [leaderboardData, setLeaderboardData] = useState(MOCK_LEADERBOARD);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all-time");
  const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "asc" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter and sort data based on user selections
    let filteredData = [...MOCK_LEADERBOARD];
    
    // Search filter
    if (searchQuery) {
      filteredData = filteredData.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort data
    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    
    setLeaderboardData(filteredData);
    
    // Animation on page load
    setIsVisible(true);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [searchQuery, selectedExam, selectedSubject, selectedTimeframe, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
                Leaderboard
              </h1>
              <p className={`text-muted-foreground max-w-2xl mx-auto mb-8 transform transition-all duration-700 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
                Compare your performance with other students and track your progress. See who's leading in JEE and NEET preparation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            {/* Top performers section */}
            <div className={`mb-10 transform transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <h2 className="text-2xl font-bold mb-6">Top Performers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {leaderboardData.slice(0, 3).map((user, index) => (
                  <Card key={user.id} className={`glass-card text-center hover-scale ${
                    index === 0 ? "border-yellow-400 dark:border-yellow-600" : 
                    index === 1 ? "border-slate-400 dark:border-slate-500" : 
                    "border-amber-800 dark:border-amber-700"
                  }`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-center mb-4">
                        {index === 0 ? (
                          <Trophy className="h-12 w-12 text-yellow-400 dark:text-yellow-300" />
                        ) : index === 1 ? (
                          <Medal className="h-12 w-12 text-slate-400 dark:text-slate-300" />
                        ) : (
                          <Medal className="h-12 w-12 text-amber-700 dark:text-amber-600" />
                        )}
                      </div>
                      <Avatar className="h-20 w-20 mx-auto mb-3">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-lg bg-primary/10">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                      <CardDescription>{user.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm">Score</p>
                          <p className="text-xl font-bold">{user.score}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm">Tests</p>
                          <p className="text-xl font-bold">{user.testsTaken}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-sm">
                        <span>Rank</span>
                        <span className="font-bold text-lg">{user.rank}</span>
                        {user.rankChange > 0 ? (
                          <span className="text-emerald-500 flex items-center">
                            <ArrowUp className="h-3 w-3" />
                            {user.rankChange}
                          </span>
                        ) : user.rankChange < 0 ? (
                          <span className="text-red-500 flex items-center">
                            <ArrowDown className="h-3 w-3" />
                            {Math.abs(user.rankChange)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Your Ranking */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{CURRENT_USER.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{CURRENT_USER.name}</p>
                        <div className="flex items-center gap-1.5 text-sm">
                          <span className="text-muted-foreground">Your Rank:</span>
                          <span className="font-bold">{CURRENT_USER.rank}</span>
                          {CURRENT_USER.rankChange > 0 ? (
                            <span className="text-emerald-500 flex items-center">
                              <ArrowUp className="h-3 w-3" />
                              {CURRENT_USER.rankChange}
                            </span>
                          ) : CURRENT_USER.rankChange < 0 ? (
                            <span className="text-red-500 flex items-center">
                              <ArrowDown className="h-3 w-3" />
                              {Math.abs(CURRENT_USER.rankChange)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="font-bold">{CURRENT_USER.score}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Tests Taken</p>
                        <p className="font-bold">{CURRENT_USER.testsTaken}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Highest Score</p>
                        <p className="font-bold">{CURRENT_USER.highestScore}%</p>
                      </div>
                    </div>
                    
                    <Button asChild>
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Leaderboard tabs and filters */}
            <div className={`transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <TabsList>
                    <TabsTrigger value="overall">Overall</TabsTrigger>
                    <TabsTrigger value="jee">JEE</TabsTrigger>
                    <TabsTrigger value="neet">NEET</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search students..."
                        className="pl-10 w-full md:w-[220px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-time">All Time</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="overall">
                  <Card>
                    <CardHeader className="pb-0">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <CardTitle>Overall Leaderboard</CardTitle>
                          <CardDescription>
                            Top performers across all exams and subjects
                          </CardDescription>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{leaderboardData.length} students</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[60px]" onClick={() => handleSort("rank")}>
                                <div className="flex items-center cursor-pointer">
                                  Rank
                                  <ArrowUpDown className="ml-1 h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead>Student</TableHead>
                              <TableHead onClick={() => handleSort("score")}>
                                <div className="flex items-center cursor-pointer">
                                  Score
                                  <ArrowUpDown className="ml-1 h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead onClick={() => handleSort("timeTaken")} className="hidden md:table-cell">
                                <div className="flex items-center cursor-pointer">
                                  Avg. Time
                                  <ArrowUpDown className="ml-1 h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead onClick={() => handleSort("testsTaken")} className="hidden md:table-cell">
                                <div className="flex items-center cursor-pointer">
                                  Tests
                                  <ArrowUpDown className="ml-1 h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead className="hidden md:table-cell">Subjects</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {leaderboardData.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-1">
                                    {user.rank}
                                    {user.rankChange > 0 ? (
                                      <span className="text-emerald-500">
                                        <ArrowUp className="h-3 w-3" />
                                      </span>
                                    ) : user.rankChange < 0 ? (
                                      <span className="text-red-500">
                                        <ArrowDown className="h-3 w-3" />
                                      </span>
                                    ) : null}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                                      <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-xs text-muted-foreground">{user.city}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{user.score}%</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                                    {Math.floor(user.timeTaken / 60)}m {Math.round(user.timeTaken % 60)}s
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{user.testsTaken}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="flex gap-2">
                                    <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                      P: {user.subjects.Physics}%
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                      C: {user.subjects.Chemistry}%
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                                      M: {user.subjects.Mathematics}%
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="jee">
                  <Card>
                    <CardHeader>
                      <CardTitle>JEE Leaderboard</CardTitle>
                      <CardDescription>Top performers for JEE preparation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">Select a specific JEE mock test for detailed rankings</p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {MOCK_TESTS.filter(test => test.type.includes("JEE")).slice(0, 3).map(test => (
                            <Button key={test.id} variant="outline" asChild>
                              <Link to={`/leaderboard/${test.id}`}>
                                {test.title} Rankings
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="neet">
                  <Card>
                    <CardHeader>
                      <CardTitle>NEET Leaderboard</CardTitle>
                      <CardDescription>Top performers for NEET preparation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">Select a specific NEET mock test for detailed rankings</p>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {MOCK_TESTS.filter(test => test.type.includes("NEET")).slice(0, 3).map(test => (
                            <Button key={test.id} variant="outline" asChild>
                              <Link to={`/leaderboard/${test.id}`}>
                                {test.title} Rankings
                              </Link>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
