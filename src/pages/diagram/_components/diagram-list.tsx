"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IDiagram } from "@/interfaces/diagram.interface";
import { diagramService } from "@/services/diagram.service";

interface DiagramListProps {
  diagrams: IDiagram[];
  selectedDiagram: string | null;
  onSelectDiagram: (id: string | null) => void;
  setDiagrams: React.Dispatch<React.SetStateAction<IDiagram[]>>; // Yangi prop
}

export default function DiagramList({
  diagrams,
  selectedDiagram,
  onSelectDiagram,
  setDiagrams,
}: DiagramListProps) {
  const handleDeleteDiagram = async (id: string) => {
    try {
      await diagramService.deleteDiagram(id);
      setDiagrams(diagrams.filter((d) => d._id !== id)); // Ro‘yxatni yangilash
      if (selectedDiagram === id) {
        onSelectDiagram(
          diagrams.length > 1
            ? (diagrams.find((d) => d._id !== id)?._id as string)
            : null
        );
      }
    } catch (error) {
      console.error("Failed to delete diagram:", error);
    }
  };

  return (
    <ul className="space-y-2">
      {diagrams.map((diagram) => (
        <li key={diagram._id} className="flex items-center">
          <button
            className={`flex-1 text-left px-3 py-2 rounded-md transition-colors ${
              selectedDiagram === diagram._id
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => onSelectDiagram(diagram._id as string)}
          >
            {diagram.name}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => diagram._id && handleDeleteDiagram(diagram._id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
}