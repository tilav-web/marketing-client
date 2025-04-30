"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import Column from "./column";
import Task from "./task";
import TaskDialog from "./task-dialog";
import { taskService } from "@/services/task.service";
import { ITask, TaskStatus } from "@/interfaces/task-interface";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [showAddForm, setShowAddForm] = useState<TaskStatus | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<{
    startDate: string;
    endDate: string;
  }>({ startDate: "", endDate: "" });

  useEffect(() => {
    (async () => {
      try {
        const data = await taskService.findAll();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t._id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskId = active.id as string;
    const overId = over.id as string;

    const columns: TaskStatus[] = [
      "task",
      "not-completed",
      "in-progress",
      "done",
    ];

    if (columns.includes(overId as TaskStatus)) {
      // To'g'ridan-to'g'ri statusni yangilash
      try {
        await taskService.update(activeTaskId, {
          status: overId as TaskStatus,
        });
        setTasks(
          tasks.map((task) =>
            task._id === activeTaskId
              ? { ...task, status: overId as TaskStatus }
              : task
          )
        );
      } catch (error) {
        console.error("Statusni yangilashda xato:", error);
      }
    } else {
      const activeTask = tasks.find((t) => t._id === activeTaskId);
      const overTask = tasks.find((t) => t._id === overId);

      if (activeTask && overTask) {
        const oldIndex = tasks.findIndex((t) => t._id === activeTaskId);
        const newIndex = tasks.findIndex((t) => t._id === overId);

        if (activeTask.status === overTask.status) {
          const newTasks = [...tasks];
          newTasks.splice(oldIndex, 1);
          newTasks.splice(newIndex, 0, activeTask);
          setTasks(newTasks);
        } else {
          // Boshqa ustunga ko'chirish
          try {
            await taskService.update(activeTaskId, {
              status: overTask.status,
            });
            setTasks(
              tasks.map((task) =>
                task._id === activeTaskId
                  ? { ...task, status: overTask.status }
                  : task
              )
            );
          } catch (error) {
            console.error("Statusni yangilashda xato:", error);
          }
        }
      }
    }

    setActiveTask(null);
  };

  const handleAddTask = async (task: string, status: TaskStatus) => {
    try {
      const newTask = await taskService.create({ task, status });
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
    }
    setShowAddForm(null);
  };

  const handleUpdateTask = async (updatedTask: ITask) => {
    try {
      const { _id, task, status, message, done } = updatedTask;
      await taskService.update(_id, { task, status, message, done });
      setTasks(
        tasks.map((t) => (t._id === _id ? { ...t, ...updatedTask } : t))
      );
    } catch (error) {
      console.error("Taskni yangilashda xato:", error);
    }
    setSelectedTask(null);
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Taskni o‘chirishda xato:", error);
    }
    setSelectedTask(null);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    let filteredTasks = tasks;

    // Status bo'yicha filtr
    if (filterStatus !== "all") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filterStatus
      );
    }

    // Task nomi bo'yicha qidirish
    if (searchTerm) {
      filteredTasks = filteredTasks.filter((task) =>
        task.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Done sana bo'yicha filtr
    if (dateFilter.startDate || dateFilter.endDate) {
      filteredTasks = filteredTasks.filter((task) => {
        if (!task.done) return false;
        const taskDate = new Date(task.done).toISOString().split("T")[0];
        const start = dateFilter.startDate || "0000-01-01";
        const end = dateFilter.endDate || "9999-12-31";
        return taskDate >= start && taskDate <= end;
      });
    }

    return filteredTasks.filter((task) => task.status === status);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Task Board</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("task")}>
                  Tasks
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("not-completed")}
                >
                  Not Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("in-progress")}
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("done")}>
                  Done
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
                <div className="px-2 py-1 space-y-2">
                  <div>
                    <label className="text-sm">Start Date</label>
                    <Input
                      type="date"
                      value={dateFilter.startDate}
                      onChange={(e) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm">End Date</label>
                    <Input
                      type="date"
                      value={dateFilter.endDate}
                      onChange={(e) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks by name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Column
            deleteTask={deleteTask}
            title="Tasks"
            tasks={getTasksByStatus("task")}
            id="task"
            onAddClick={() => setShowAddForm("task")}
            showAddForm={showAddForm === "task"}
            onAdd={(task) => handleAddTask(task, "task")}
            onCancel={() => setShowAddForm(null)}
            onTaskClick={setSelectedTask}
          />
          <Column
            deleteTask={deleteTask}
            title="Not Completed"
            tasks={getTasksByStatus("not-completed")}
            id="not-completed"
            onAddClick={() => setShowAddForm("not-completed")}
            showAddForm={showAddForm === "not-completed"}
            onAdd={(task) => handleAddTask(task, "not-completed")}
            onCancel={() => setShowAddForm(null)}
            onTaskClick={setSelectedTask}
          />
          <Column
            deleteTask={deleteTask}
            title="In Progress"
            tasks={getTasksByStatus("in-progress")}
            id="in-progress"
            onAddClick={() => setShowAddForm("in-progress")}
            showAddForm={showAddForm === "in-progress"}
            onAdd={(task) => handleAddTask(task, "in-progress")}
            onCancel={() => setShowAddForm(null)}
            onTaskClick={setSelectedTask}
          />
          <Column
            deleteTask={deleteTask}
            title="Done"
            tasks={getTasksByStatus("done")}
            id="done"
            onAddClick={() => setShowAddForm("done")}
            showAddForm={showAddForm === "done"}
            onAdd={(task) => handleAddTask(task, "done")}
            onCancel={() => setShowAddForm(null)}
            onTaskClick={setSelectedTask}
          />
        </div>
        <DragOverlay>
          {activeTask ? <Task task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onDelete={deleteTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
}
