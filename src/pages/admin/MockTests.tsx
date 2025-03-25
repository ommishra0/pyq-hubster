
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useToast } from "@/components/ui/use-toast";
import { Plus, Upload, FileText, Trash2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const mockTestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  subject: z.string().min(1, "Subject is required"),
  duration: z.string().min(1, "Duration is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  totalQuestions: z.string().min(1, "Total questions is required"),
});

const MockTests = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("add");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof mockTestSchema>>({
    resolver: zodResolver(mockTestSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      duration: "",
      difficulty: "",
      totalQuestions: "",
    },
  });

  const onSubmit = (values: z.infer<typeof mockTestSchema>) => {
    // Here you would normally connect to Supabase to save the mock test
    console.log(values);
    toast({
      title: "Mock test created",
      description: "Your mock test has been successfully created.",
    });
    form.reset();
  };

  const handleCsvUpload = () => {
    if (!csvFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    // Here you would process the CSV file and send to Supabase
    toast({
      title: "CSV file uploaded",
      description: "Your questions have been successfully uploaded.",
    });
    setCsvFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Mock Tests</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setActiveTab("add")}
            variant={activeTab === "add" ? "default" : "outline"}
            size="sm"
            className="text-xs h-8"
          >
            <Plus className="mr-1 h-3 w-3" />
            Add New
          </Button>
          <Button
            onClick={() => setActiveTab("upload")}
            variant={activeTab === "upload" ? "default" : "outline"}
            size="sm"
            className="text-xs h-8"
          >
            <Upload className="mr-1 h-3 w-3" />
            Bulk Upload
          </Button>
          <Button
            onClick={() => setActiveTab("manage")}
            variant={activeTab === "manage" ? "default" : "outline"}
            size="sm"
            className="text-xs h-8"
          >
            <FileText className="mr-1 h-3 w-3" />
            Manage
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="hidden">
          <TabsTrigger value="add">Add New</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Mock Test</CardTitle>
              <CardDescription>
                Create a new mock test for students to practice with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Test Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. JEE Mains 2023 Mock Test" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="chemistry">Chemistry</SelectItem>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="biology">Biology</SelectItem>
                              <SelectItem value="combined">Combined</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="e.g. 180"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalQuestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Questions</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="e.g. 90"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a description of this mock test"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="mt-4">
                    Create Mock Test
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Mock Tests</CardTitle>
              <CardDescription>
                Upload multiple mock tests and questions using a CSV file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".csv"
                    className="max-w-sm mx-auto"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  />
                  {csvFile && (
                    <p className="mt-2 text-sm text-primary">
                      Selected file: {csvFile.name}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">CSV Format Instructions:</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your CSV file should have the following columns:
                  </p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                    <li>Test ID</li>
                    <li>Test Title</li>
                    <li>Subject</li>
                    <li>Difficulty</li>
                    <li>Question</li>
                    <li>Option A</li>
                    <li>Option B</li>
                    <li>Option C</li>
                    <li>Option D</li>
                    <li>Correct Answer</li>
                    <li>Explanation (optional)</li>
                  </ul>
                </div>
                <Button 
                  onClick={handleCsvUpload}
                  disabled={!csvFile}
                >
                  Upload and Process
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Mock Tests</CardTitle>
              <CardDescription>
                View, edit, or delete existing mock tests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No mock tests available yet
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockTests;
