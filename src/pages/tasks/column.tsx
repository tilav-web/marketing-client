"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ITask, TaskStatus } from "@/interfaces/task-interface";
import SortableTask from "./sortable-task";
import AddTaskForm from "./add-task-form";

interface ColumnProps {
  title: string;
  tasks: ITask[];
  id: TaskStatus;
  onAddClick: () => void;
  showAddForm: boolean;
  onAdd: (task: string) => void;
  onCancel: () => void;
  deleteTask: (id: string) => void;
  onTaskClick: (task: ITask) => void;
}

export default function Column({
  title,
  tasks,
  id,
  onAddClick,
  showAddForm,
  onAdd,
  onCancel,
  onTaskClick,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button size="sm" variant="ghost" onClick={onAddClick}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className="h-[calc(100%-4rem)] overflow-y-auto"
      >
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task._id} onClick={() => onTaskClick(task)}>
                <SortableTask task={task} />
              </div>
            ))}
          </div>
        </SortableContext>
        {showAddForm && <AddTaskForm onAdd={onAdd} onCancel={onCancel} />}
      </CardContent>
    </Card>
  );
}
