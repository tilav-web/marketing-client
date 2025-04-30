import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ContentStatusEnum, IContent } from "@/interfaces/content.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { userService } from "@/services/user.service";
import { contentService } from "@/services/content.service";
import {
  addContent,
  deleteContent,
  setContents,
  updateContent,
} from "@/features/content.slice";

// Form schema
const contentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.nativeEnum(ContentStatusEnum),
  type: z.string().min(1, "Type is required"),
  publish_date: z.string().min(1, "Publish date is required"),
  assignedTo: z.string().min(1, "Assigned user is required"),
});

export default function ContentPage() {
  const { contents } = useSelector((state: RootState) => state.contents);
  const [filteredContents, setFilteredContents] = useState<IContent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<IContent | null>(null);
  const [users, setUsers] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [userQuery, setUserQuery] = useState("");
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!userQuery) return;
      try {
        const data = await userService.findByEmailAndName(userQuery);
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [userQuery]);

  // Initialize form
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      name: "",
      status: ContentStatusEnum.IDEA,
      type: "",
      publish_date: new Date().toISOString().split("T")[0],
      assignedTo: "",
    },
  });

  // Load data
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await contentService.findAll();
        dispatch(setContents(data));
        setFilteredContents(data);
      } catch (error) {
        console.error("Error fetching contents", error);
      }
    };

    fetchContents();
  }, [dispatch]);

  // Filter data
  useEffect(() => {
    let filtered = [...contents];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (content) =>
          content.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.assignedTo?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((content) => content.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== "ALL") {
      filtered = filtered.filter((content) => content.type === typeFilter);
    }

    setFilteredContents(filtered);
  }, [contents, searchQuery, statusFilter, typeFilter]);

  // Get unique content types for filter
  const contentTypes = Array.from(
    new Set(contents.map((content) => content.type))
  );

  // Create new content
  const handleCreateContent = async (
    data: z.infer<typeof contentFormSchema>
  ) => {
    try {
      const { name, status, type, publish_date, assignedTo } = data;
      const resData = await contentService.create({
        name,
        status,
        type,
        publish_date,
        assignedTo,
      });
      dispatch(addContent(resData));
    } catch (error) {
      console.error(error);
    }
    form.reset();
  };

  // Edit content
  const handleEditContent = async (data: z.infer<typeof contentFormSchema>) => {
    if (!currentContent) return;
    try {
      const { name, status, type, publish_date, assignedTo } = data;
      const resData = await contentService.update({
        _id: currentContent._id,
        name,
        status,
        type,
        publish_date,
        assignedTo,
      });
      dispatch(updateContent(resData));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error("An unknown error occurred");
    }
    setIsEditDialogOpen(false);
  };

  // Delete content
  const handleDeleteContent = async () => {
    if (!currentContent) return;
    try {
      await contentService.delete(currentContent._id);
      dispatch(deleteContent(currentContent._id));
    } catch (error) {
      console.error("Error deleting content", error);
    }
    setIsDeleteDialogOpen(false);
  };

  // Open edit dialog
  const openEditDialog = (content: IContent) => {
    setCurrentContent(content);
    form.reset({
      name: content.name,
      status: content.status,
      type: content.type,
      publish_date: content.publish_date,
      assignedTo: content.assignedTo.name,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (content: IContent) => {
    setCurrentContent(content);
    setIsDeleteDialogOpen(true);
  };

  // Reset form for create
  const openCreateDialog = () => {
    form.reset({
      name: "",
      status: ContentStatusEnum.IDEA,
      type: "",
      publish_date: new Date().toISOString().split("T")[0],
      assignedTo: "",
    });
    setIsCreateDialogOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status: ContentStatusEnum) => {
    switch (status) {
      case ContentStatusEnum.PUBLISHED:
        return <Badge className="bg-green-500">Published</Badge>;
      case ContentStatusEnum.IDEA:
        return <Badge className="bg-yellow-500">IDEA</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        {user?.role !== "user" && (
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> Add Content
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                Status: {statusFilter === "ALL" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("ALL")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter(ContentStatusEnum.PUBLISHED)}
              >
                Published
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter(ContentStatusEnum.IDEA)}
              >
                IDEA
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                Type: {typeFilter === "ALL" ? "All" : typeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter("ALL")}>
                All
              </DropdownMenuItem>
              {contentTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Assigned To</TableHead>
              {user?.role !== "user" && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No content found
                </TableCell>
              </TableRow>
            ) : (
              filteredContents.map((content) => (
                <TableRow key={content._id}>
                  <TableCell className="font-medium">{content.name}</TableCell>
                  <TableCell>{getStatusBadge(content.status)}</TableCell>
                  <TableCell>{content.type}</TableCell>
                  <TableCell>
                    {format(new Date(content.publish_date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{content.assignedTo?.name}</TableCell>
                  {user?.role !== "user" && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(content)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(content)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
            <DialogDescription>
              Add a new content item to your collection.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateContent)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Content name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          defaultChecked
                          value={ContentStatusEnum.IDEA}
                        >
                          IDEA
                        </SelectItem>
                        <SelectItem value={ContentStatusEnum.PUBLISHED}>
                          Published
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Content type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publish_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Search user..."
                          value={userQuery}
                          onChange={(e) => setUserQuery(e.target.value)}
                          className="mb-2"
                        />
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const selected = users.find((u) => u._id === value);
                            setUserQuery(selected?.name || "");
                          }}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              users?.length > 0 ? "" : "hidden"
                            }`}
                          >
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.length > 0 ? (
                              users.map((user) => (
                                <SelectItem key={user._id} value={user._id}>
                                  <p>{user?.name}</p>
                                  <span className="text-sm">{user?.email}</span>
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                No users found
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>
              Update the content information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditContent)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Content name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ContentStatusEnum.IDEA}>
                          IDEA
                        </SelectItem>
                        <SelectItem value={ContentStatusEnum.PUBLISHED}>
                          Published
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Content type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publish_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Search user..."
                          value={userQuery}
                          onChange={(e) => setUserQuery(e.target.value)}
                          className="mb-2"
                        />
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const selected = users.find((u) => u._id === value);
                            setUserQuery(selected?.name || "");
                          }}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full ${
                              users?.length > 0 ? "" : "hidden"
                            }`}
                          >
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users?.length > 0 ? (
                              users?.map((user) => (
                                <SelectItem key={user._id} value={user._id}>
                                  <p>{user?.name}</p>
                                  <span className="text-sm">{user?.email}</span>
                                </SelectItem>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-sm text-muted-foreground">
                                No users found
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the content "{currentContent?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContent}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
