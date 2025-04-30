import { privateInstance } from "@/api/api-client";

class TaskService {
  async findAll() {
    try {
      const res = await privateInstance.get("/tasks");
      return res.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred");
    }
  }

  async create({ task, status }: { task: string; status: string }) {
    try {
      const res = await privateInstance.post("/tasks", { task, status });
      return res.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred");
    }
  }

  async update(
    id: string,
    {
      task,
      status,
      message,
      done,
    }: { task?: string; status?: string; message?: string; done?: Date }
  ) {
    try {
      const res = await privateInstance.put(`/tasks/${id}`, {
        task,
        status,
        message,
        done,
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred");
    }
  }

  async delete(id: string) {
    try {
      const res = await privateInstance.delete(`/tasks/${id}`);
      return res.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred");
    }
  }
}

export const taskService = new TaskService();
