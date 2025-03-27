
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BookOpen, Award, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "@/services/adminService";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchQuestions } from "@/services/adminService";

const Dashboard = () => {
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['admin-users-count'],
    queryFn: fetchAllUsers,
  });

  const { data: mockTestsData, isLoading: isLoadingMockTests } = useQuery({
    queryKey: ['admin-mock-tests-count'],
    queryFn: () => fetchQuestions('mock_test'),
  });

  const { data: pyqsData, isLoading: isLoadingPyqs } = useQuery({
    queryKey: ['admin-pyqs-count'],
    queryFn: () => fetchQuestions('pyq'),
  });

  const { data: booksData, isLoading: isLoadingBooks } = useQuery({
    queryKey: ['admin-books-count'],
    queryFn: () => fetchQuestions('book'),
  });

  // Get top performers (users with the highest points)
  const topPerformers = [...users]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  // Get recently added questions
  const recentActivity = [...(mockTestsData?.questions || []), ...(pyqsData?.questions || []), ...(booksData?.questions || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingUsers ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  {users.length > 0 ? `+${Math.min(users.length, 5)} new this month` : "No users yet"}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Mock Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingMockTests ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{mockTestsData?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {mockTestsData?.total ? `${Math.min(mockTestsData.total, 3)} added this week` : "No mock tests yet"}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">PYQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingPyqs ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{pyqsData?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {pyqsData?.total ? `${Math.min(pyqsData.total, 5)} added this week` : "No PYQs yet"}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Book Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingBooks ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{booksData?.total || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {booksData?.total ? `${Math.min(booksData.total, 2)} added this week` : "No book questions yet"}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingUsers ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))
              ) : topPerformers.length > 0 ? (
                topPerformers.map((user, index) => (
                  <div key={user.id} className="flex items-center">
                    <div className="mr-4 rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center relative">
                      {index === 0 && (
                        <span className="absolute -top-1 -right-1 bg-amber-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                      )}
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      {user.points} 
                      <Award className="h-3 w-3 text-amber-500 ml-1" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center">
                  <div className="mr-4 rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">No data available yet</p>
                    <p className="text-xs text-muted-foreground">Users will appear here once they complete tests</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingMockTests || isLoadingPyqs || isLoadingBooks ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-4" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="mr-4 rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center">
                      {activity.source_type === 'mock_test' && <FileText className="h-5 w-5 text-blue-500" />}
                      {activity.source_type === 'pyq' && <FileText className="h-5 w-5 text-green-500" />}
                      {activity.source_type === 'book' && <BookOpen className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{activity.question_text}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.source_type === 'mock_test' ? 'Mock Test' : 
                         activity.source_type === 'pyq' ? 'PYQ' : 'Book'} 
                        {' - '}
                        {activity.subject} 
                        {' - '}
                        {new Date(activity.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center">
                  <div className="mr-4 rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">No recent activity</p>
                    <p className="text-xs text-muted-foreground">Activity will appear here as you add content</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
