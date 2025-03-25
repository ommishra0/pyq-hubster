
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Crown, Medal, Search, ArrowUp, ArrowDown, ArrowRight, BarChart3, Star, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar_url?: string;
  score: number;
  tests_taken: number;
  rank: number;
  points: number;
  change: 'up' | 'down' | 'same';
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // In a real application, this would fetch from Supabase
    setTimeout(() => {
      setIsLoading(false);
      // This is dummy data since we don't have a real Supabase connection yet
      setLeaderboardUsers([]);
    }, 1000);
  }, []);

  // Filter users based on search query
  const filteredUsers = leaderboardUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-secondary/10 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">JEE/NEET Top Performers</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Track your progress and see how you stack up against other students. 
                Earn points for each correct answer and climb up the leaderboard.
              </p>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            {currentUserRank && (
              <Card className="mb-8 bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {currentUserRank.avatar_url ? (
                          <img 
                            src={currentUserRank.avatar_url} 
                            alt={currentUserRank.name} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <Trophy className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{currentUserRank.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {currentUserRank.tests_taken} Tests Completed
                        </p>
                      </div>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-2xl font-bold">{currentUserRank.rank}</p>
                      <p className="text-xs text-muted-foreground">Rank</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-2xl font-bold flex items-center justify-center">
                        {currentUserRank.points}
                        <Star className="h-4 w-4 ml-1 text-amber-500" />
                      </p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-2xl font-bold flex items-center justify-center">
                        {currentUserRank.score}%
                        <BarChart3 className="h-4 w-4 ml-1 text-blue-500" />
                      </p>
                      <p className="text-xs text-muted-foreground">Avg. Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Leaderboard Rankings</h2>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all-time" className="mb-8">
              <TabsList>
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>

              <TabsContent value="all-time" className="p-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rank</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-center">Tests Taken</TableHead>
                            <TableHead className="text-center">Points</TableHead>
                            <TableHead className="text-center">Avg. Score</TableHead>
                            <TableHead className="text-center">Change</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {isLoading ? (
                            // Loading skeletons
                            Array.from({ length: 5 }).map((_, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <Skeleton className="h-6 w-6 rounded-full" />
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-4 w-8 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-4 w-16 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-4 w-12 mx-auto" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-4 w-8 mx-auto" />
                                </TableCell>
                              </TableRow>
                            ))
                          ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center justify-center">
                                    {index === 0 ? (
                                      <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                                        <Crown className="h-3 w-3" />
                                      </div>
                                    ) : index === 1 ? (
                                      <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <Medal className="h-3 w-3" />
                                      </div>
                                    ) : index === 2 ? (
                                      <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
                                        <Medal className="h-3 w-3" />
                                      </div>
                                    ) : (
                                      <span className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                        {user.rank}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                      {user.avatar_url ? (
                                        <img 
                                          src={user.avatar_url}
                                          alt={user.name}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <Trophy className="h-5 w-5 text-primary" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium">{user.name}</p>
                                      {user.id === user?.id && (
                                        <Badge variant="outline" className="text-xs">You</Badge>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">{user.tests_taken}</TableCell>
                                <TableCell className="text-center font-medium">
                                  <div className="flex items-center justify-center">
                                    {user.points}
                                    <Star className="h-3 w-3 ml-1 text-amber-500" />
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">{user.score}%</TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center">
                                    {user.change === 'up' ? (
                                      <ArrowUp className="h-4 w-4 text-green-500" />
                                    ) : user.change === 'down' ? (
                                      <ArrowDown className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <ArrowRight className="h-4 w-4 text-gray-400" />
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <Trophy className="h-8 w-8 text-muted-foreground" />
                                  <p className="text-muted-foreground">No users on the leaderboard yet</p>
                                  {!user && (
                                    <Button asChild variant="outline" size="sm" className="mt-2">
                                      <Link to="/login">Login to get started</Link>
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly" className="p-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Monthly Leaderboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Take tests to appear on this leaderboard.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="p-0">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Weekly Leaderboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Take tests to appear on this leaderboard.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="bg-primary/5 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">How the Leaderboard Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Points System</p>
                    <p className="text-sm text-muted-foreground">
                      Each correct answer in a PYQ or mock test earns you 5 points.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Rankings</p>
                    <p className="text-sm text-muted-foreground">
                      Users are ranked based on their total points earned.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Live Updates</p>
                    <p className="text-sm text-muted-foreground">
                      Leaderboard updates in real-time after each test attempt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
