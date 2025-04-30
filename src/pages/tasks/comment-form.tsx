"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

interface CommentFormProps {
  onSubmit: (message?: string) => void;
  onCancel: () => void;
}

export default function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment.trim() || undefined);
    setComment("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add Comment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Enter your comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4 min-h-[100px]"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                Skip
              </Button>
              <Button type="submit" size="sm">
                <Check className="h-4 w-4 mr-1" /> Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
