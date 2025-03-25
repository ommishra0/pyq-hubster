
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Ban, Search, Users } from "lucide-react";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 w-full sm:w-auto min-w-[240px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            View and manage users on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tests Taken</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No users available yet
                  </TableCell>
                </TableRow>
                {/* Sample row - will be removed when real data is available */}
                {/*
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Om Mishra</p>
                        <p className="text-xs text-muted-foreground">Joined on 15 Jun 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>ommishra@gmail.com</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-amber-500 mr-1" />
                      <span>1,245</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
