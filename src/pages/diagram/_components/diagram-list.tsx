"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Plus, Search, MoreVertical, FileText } from "lucide-react";
import { IDiagram } from "@/interfaces/diagram.interface";
import { Link } from "react-router-dom";

interface DiagramListProps {
  diagrams: IDiagram[];
  currentDiagramId?: string;
  onCreateNew: () => void;
  onDeleteDiagram: (id: string) => void;
  isLoading: boolean;
}

export default function DiagramList({
  diagrams,
  currentDiagramId,
  onCreateNew,
  onDeleteDiagram,
  isLoading,
}: DiagramListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [diagramToDelete, setDiagramToDelete] = useState<string | null>(null);

  // Filter diagrams based on search query
  const filteredDiagrams = diagrams.filter((diagram) =>
    diagram.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete confirmation
  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDiagramToDelete(id);
  };

  const confirmDelete = () => {
    if (diagramToDelete) {
      onDeleteDiagram(diagramToDelete);
      setDiagramToDelete(null);
    }
  };

  return (
    <div className="w-64 h-full border-r bg-slate-50 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium mb-4">My Diagrams</h2>
        <div className="flex gap-2">
          <Button
            onClick={onCreateNew}
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDiagrams?.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            {searchQuery ? "No diagrams match your search" : "No diagrams yet"}
          </div>
        ) : (
          <div className="p-2">
            {filteredDiagrams?.map((diagram) => (
              <Link
                to={`/sub/diagram/${diagram._id}`}
                key={diagram._id}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-200 ${
                  currentDiagramId === diagram._id ? "bg-slate-200" : ""
                }`}
              >
                <FileText className="h-5 w-5 text-slate-500" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{diagram.title}</div>
                  <div className="text-xs text-slate-500">
                    {diagram.nodes?.length} nodes, {diagram.edges?.length} edges
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => handleDeleteClick(diagram._id!, e)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!diagramToDelete}
        onOpenChange={(open) => !open && setDiagramToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this diagram. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
