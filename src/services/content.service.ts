import { privateInstance } from "@/api/api-client";

class ContentService {
  async create({
    name,
    status,
    type,
    publish_date,
    assignedTo,
  }: {
    name: string;
    status?: string;
    type: string;
    publish_date: string;
    assignedTo: string;
  }) {
    try {
      const res = await privateInstance.post("/content", {
        name,
        status,
        type,
        publish_date,
        assignedTo,
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
  async findAll() {
    try {
      const res = await privateInstance.get("/content");
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
  async update({
    _id,
    name,
    status,
    type,
    publish_date,
    assignedTo,
  }: {
    _id: string;
    name?: string;
    status?: string;
    type?: string;
    publish_date?: string;
    assignedTo?: string;
  }) {
    try {
      const res = await privateInstance.put(`/content/${_id}`, {
        name,
        status,
        type,
        publish_date,
        assignedTo,
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
  async delete(_id: string) {
    try {
      const res = await privateInstance.delete(`/content/${_id}`);
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }
}

export const contentService = new ContentService();
