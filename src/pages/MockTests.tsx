
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Clock,
  Search,
  FilterIcon,
  BookOpen,
  Users,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock data for tests
const MOCK_TESTS = [
  {
    id: 1,
    title: "JEE Main 2023 Full Mock Test",
    type: "JEE Main",
    duration: 180,
    questions: 90,
    participants: 12645,
    difficulty: "Medium",
    date: "2023-09-15",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    description: "Complete mock test simulating the actual JEE Main 2023 exam pattern with questions covering all three subjects.",
  },
  {
    id: 2,
    title: "NEET 2023 Biology Section",
    type: "NEET",
    duration: 60,
    questions: 45,
    participants: 8721,
    difficulty: "Hard",
    date: "2023-08-20",
    subjects: ["Biology"],
    description: "Focus on the Biology section of NEET 2023 with challenging questions from Botany and Zoology.",
  },
  {
    id: 3,
    title: "JEE Advanced Mathematics",
    type: "JEE Advanced",
    duration: 90,
    questions: 30,
    participants: 5426,
    difficulty: "Hard",
    date: "2023-10-05",
    subjects: ["Mathematics"],
    description: "Advanced level Mathematics questions following the JEE Advanced pattern to test your problem-solving skills.",
  },
  {
    id: 4,
    title: "NEET Full Length Test",
    type: "NEET",
    duration: 180,
    questions: 180,
    participants: 9842,
    difficulty: "Medium",
    date: "2023-09-25",
    subjects: ["Physics", "Chemistry", "Biology"],
    description: "Complete NEET exam simulation with questions from Physics, Chemistry, and Biology following the latest pattern.",
  },
  {
    id: 5,
    title: "JEE Main Physics Practice",
    type: "JEE Main",
    duration: 60,
    questions: 30,
    participants: 7325,
    difficulty: "Easy",
    date: "2023-08-10",
    subjects: ["Physics"],
    description: "Focus on building your Physics fundamentals with this JEE Main level practice test.",
  },
  {
    id: 6,
    title: "JEE Advanced Chemistry",
    type: "JEE Advanced",
    duration: 60,
    questions: 25,
    participants: 4218,
    difficulty: "Hard",
    date: "2023-09-30",
    subjects: ["Chemistry"],
    description: "Challenging Chemistry questions following the JEE Advanced pattern with a focus on Physical and Organic Chemistry.",
  },
  {
    id: 7,
    title: "NEET Physics & Chemistry",
    type: "NEET",
    duration: 120,
    questions: 90,
    participants: 6530,
    difficulty: "Medium",
    date: "2023-10-15",
    subjects: ["Physics", "Chemistry"],
    description: "Practice test focusing on Physics and Chemistry sections of the NEET exam with balanced difficulty.",
  },
  {
    id: 8,
    title: "JEE Main 2022 Previous Year",
    type: "JEE Main",
    duration: 180,
    questions: 90,
    participants: 15240,
    difficulty: "Medium",
    date: "2023-08-05",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    description: "Based on the actual JEE Main 2022 paper, this test helps you experience the real exam pattern and difficulty.",
  },
];

const MockTests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredTests, setFilteredTests] = useState(MOCK_TESTS);
  const [isVisible, setIsVisible] = useState(false);

  // Filter tests based on search query and filters
  useEffect(() => {
    const filtered = MOCK_TESTS.filter((test) => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "" || test.type === selectedType;
      const matchesSubject = selectedSubject === "" || test.subjects.includes(selectedSubject);
      const matchesDifficulty = selectedDifficulty === "" || test.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesType && matchesSubject && matchesDifficulty;
    });
    
    setFilteredTests(filtered);
  }, [searchQuery, selectedType, selectedSubject, selectedDifficulty]);

  // Animation on page load
  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background pt-20 pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
                Mock Tests
              </h1>
              <p className={`text-muted-foreground max-w-2xl mx-auto mb-8 transform transition-all duration-700 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
                Practice with our comprehensive collection of JEE and NEET mock tests designed 
                to simulate the actual exam experience and improve your test-taking skills.
              </p>
            </div>
          </div>
        </section>

        {/* Filters section */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className={`bg-card rounded-xl p-6 shadow-sm border mb-10 transform transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search mock tests..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="JEE Main">JEE Main</SelectItem>
                    <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Test results count */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredTests.length} {filteredTests.length === 1 ? 'Test' : 'Tests'} Available
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FilterIcon className="h-4 w-4" />
                <span>Filters Applied: {[
                  selectedType && `Type: ${selectedType}`,
                  selectedSubject && `Subject: ${selectedSubject}`,
                  selectedDifficulty && `Difficulty: ${selectedDifficulty}`
                ].filter(Boolean).join(', ') || 'None'}</span>
              </div>
            </div>
            
            {/* Test cards */}
            {filteredTests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTests.map((test, index) => (
                  <div 
                    key={test.id}
                    className={`glass-card rounded-xl overflow-hidden hover-scale transform transition-all duration-500 delay-${index * 100} ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          test.type === 'JEE Main' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : test.type === 'JEE Advanced'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {test.type}
                        </span>
                        
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          test.difficulty === 'Easy' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                            : test.difficulty === 'Medium'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-lg mb-2">{test.title}</h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {test.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{test.duration} mins</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{test.questions} questions</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{test.participants.toLocaleString()} taken</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {test.subjects.map((subject) => (
                          <span 
                            key={subject}
                            className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                      
                      <Button className="w-full" asChild>
                        <Link to={`/mock-tests/${test.id}`} className="flex items-center justify-center gap-2">
                          Start Test
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No mock tests found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query to find the mock tests you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("");
                    setSelectedSubject("");
                    setSelectedDifficulty("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MockTests;
