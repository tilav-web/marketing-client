"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, CheckCircle, Edit, Trash, X } from "lucide-react";
import { ITask, TaskStatus } from "@/interfaces/task-interface";

interface TaskDialogProps {
  task: ITask;
  onUpdate: (task: ITask) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function TaskDialog({
  task,
  onUpdate,
  onDelete,
  onClose,
}: TaskDialogProps) {
  const [title, setTitle] = useState(task.task);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [message, setMessage] = useState(task.message || "");
  const [doneDate, setDoneDate] = useState<Date | undefined>(task.done);

  const handleSubmit = () => {
    onUpdate({
      ...task,
      task: title,
      status,
      message,
      done: status === "done" ? doneDate || new Date() : undefined,
    });
  };

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Task Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Select
              value={status}
              onValueChange={(value: TaskStatus) => setStatus(value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="not-completed">Not Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a comment (optional)"
              className="mt-1 min-h-[100px]"
            />
          </div>
          {status === "done" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Completed Date
              </label>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <Input
                  type="date"
                  value={
                    doneDate && typeof doneDate !== "string"
                      ? doneDate?.toISOString()?.split("T")[0]
                      : ""
                  }
                  onChange={(e) => setDoneDate(new Date(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => onDelete(task._id)}
            className="flex items-center gap-2"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
