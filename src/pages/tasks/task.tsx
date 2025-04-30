import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ITask } from "@/interfaces/task-interface";
import { CircleCheck, Clock3, MessageSquareText } from "lucide-react";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps) {
  return (
    <Card className="cursor-grab active:cursor-grabbing select-none">
      <CardContent className="">
        <div className="flex items-start gap-2">
          {task.status === "done" && (
            <CircleCheck className="h-10 w-10 text-green-500" />
          )}
          <p className="font-medium pb-2">{task.task}</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            {task.message && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="border p-1 rounded cursor-pointer">
                    <MessageSquareText size={18} />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-sm mt-1 italic">"{task.message}"</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {task.status === "done" && task.done && (
              <p className="text-sm text-white py-1 px-2 rounded-md flex items-center gap-1 bg-green-500">
                <Clock3 size={16} />
                {new Date(task.done).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
