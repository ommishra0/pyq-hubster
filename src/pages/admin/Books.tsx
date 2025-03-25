
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

const bookQuestionSchema = z.object({
  book: z.string().min(1, "Book name is required"),
  question: z.string().min(10, "Question must be at least 10 characters"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  chapter: z.string().min(1, "Chapter is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
});

const Books = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("add");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof bookQuestionSchema>>({
    resolver: zodResolver(bookQuestionSchema),
    defaultValues: {
      book: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
      explanation: "",
      subject: "",
      chapter: "",
      difficulty: "",
    },
  });

  const onSubmit = (values: z.infer<typeof bookQuestionSchema>) => {
    // Here you would normally connect to Supabase to save the book question
    console.log(values);
    toast({
      title: "Book question created",
      description: "Your book question has been successfully created.",
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
        <h1 className="text-2xl font-bold">Book Questions</h1>
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
              <CardTitle>Add New Book Question</CardTitle>
              <CardDescription>
                Add a new question from popular reference books for students to practice with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="book"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Book Name</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a book" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="irodov">Irodov</SelectItem>
                              <SelectItem value="dc_pandey">DC Pandey</SelectItem>
                              <SelectItem value="hc_verma">HC Verma</SelectItem>
                              <SelectItem value="ncert">NCERT</SelectItem>
                              <SelectItem value="resnick_halliday">Resnick & Halliday</SelectItem>
                              <SelectItem value="morrison_boyd">Morrison & Boyd</SelectItem>
                              <SelectItem value="rd_sharma">RD Sharma</SelectItem>
                              <SelectItem value="cengage">Cengage</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
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
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the question here"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="optionA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option A</FormLabel>
                          <FormControl>
                            <Input placeholder="Option A" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionB"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option B</FormLabel>
                          <FormControl>
                            <Input placeholder="Option B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option C</FormLabel>
                          <FormControl>
                            <Input placeholder="Option C" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="optionD"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option D</FormLabel>
                          <FormControl>
                            <Input placeholder="Option D" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="correctAnswer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correct Answer</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select correct answer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A">Option A</SelectItem>
                              <SelectItem value="B">Option B</SelectItem>
                              <SelectItem value="C">Option C</SelectItem>
                              <SelectItem value="D">Option D</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chapter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chapter</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Kinematics" {...field} />
                          </FormControl>
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
                  </div>

                  <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Explanation (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide an explanation for the correct answer"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="mt-4">
                    Add Question
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Book Questions</CardTitle>
              <CardDescription>
                Upload multiple book questions using a CSV file.
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
                    <li>Book Name</li>
                    <li>Subject</li>
                    <li>Chapter</li>
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
              <CardTitle>Manage Book Questions</CardTitle>
              <CardDescription>
                View, edit, or delete existing book questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Chapter</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No book questions available yet
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

export default Books;
