"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";

interface AddTaskFormProps {
  onAdd: (content: string) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content.trim());
      setContent("");
    }
  };

  return (
    <Card className="mt-2">
      <CardContent className="p-3">
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Enter task description..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2 min-h-[80px]"
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onCancel}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!content.trim()}>
              <Check className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
