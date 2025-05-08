// services/shape.service.ts

import { privateInstance } from "@/api/api-client";
import { IShape } from "@/interfaces/shape.interface";

const API_ENDPOINT = "/shapes";

class ShapeService {
  // Shape yaratish
  async createShape(shape: IShape): Promise<IShape> {
    try {
      const response = await privateInstance.post(API_ENDPOINT, shape);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create shape: ${error}`);
    }
  }

  async fetchShapesByDiagramId(id: string): Promise<IShape[]> {
    try {
      const res = await privateInstance.get(`${API_ENDPOINT}/diagram/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(`Failed to fetch shapes: ${error}`);
    }
  }

  // Barcha shapelarni olish
  async fetchShapes(): Promise<IShape[]> {
    try {
      const response = await privateInstance.get(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch shapes: ${error}`);
    }
  }

  // Bitta shape olish (id orqali)
  async fetchShape(id: string): Promise<IShape> {
    try {
      const response = await privateInstance.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch shape: ${error}`);
    }
  }

  async updateMany(shapes: IShape[]) {
    try {
      const res = await privateInstance.put(
        `${API_ENDPOINT}/update-many`,
        shapes
      );
      return res.data;
    } catch (error) {
      throw new Error(`Failed to fetch shape: ${error}`);
    }
  }

  // Shape yangilash
  async updateShape(id: string, shape: Partial<IShape>): Promise<IShape> {
    try {
      const response = await privateInstance.put(
        `${API_ENDPOINT}/${id}`,
        shape
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update shape: ${error}`);
    }
  }

  // Shape o‘chirish
  async deleteShape(id: string): Promise<void> {
    try {
      await privateInstance.delete(`${API_ENDPOINT}/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete shape: ${error}`);
    }
  }
}

export const shapeService = new ShapeService();
