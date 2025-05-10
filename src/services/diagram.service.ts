import { privateInstance } from "@/api/api-client";
import { IDiagram } from "@/interfaces/diagram.interface";
import { AxiosError } from "axios";

const API_ENDPOINT = "/diagrams";

export class DiagramService {
  // Get all diagrams for a user
  async getUserDiagrams(id: string): Promise<IDiagram[]> {
    try {
      const response = await privateInstance.get<IDiagram[]>(
        `${API_ENDPOINT}/user/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(
        err.response?.status === 404
          ? "No diagrams found for this user"
          : "Failed to fetch diagrams"
      );
    }
  }

  // Get a specific diagram by ID
  async getDiagramById(diagramId: string): Promise<IDiagram> {
    try {
      const response = await privateInstance.get<IDiagram>(
        `${API_ENDPOINT}/${diagramId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(
        err.response?.status === 404
          ? "Diagram not found"
          : "Failed to fetch diagram"
      );
    }
  }

  // Create a new diagram
  async createDiagram(diagram: Partial<IDiagram>): Promise<IDiagram> {
    try {
      const response = await privateInstance.post<IDiagram>(
        API_ENDPOINT,
        diagram
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(
        err.response?.status === 401
          ? "Unauthorized: Please log in"
          : "Failed to create diagram"
      );
    }
  }

  // Save a diagram (create or update)
  async saveDiagram(diagram: IDiagram): Promise<IDiagram> {
    try {
      const response = await privateInstance.post<IDiagram>(
        `${API_ENDPOINT}/save`,
        diagram
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(
        err.response?.status === 400
          ? "Invalid diagram data"
          : err.response?.status === 401
          ? "Unauthorized: Please log in"
          : "Failed to save diagram"
      );
    }
  }

  // Delete a diagram
  async deleteDiagram(diagramId: string): Promise<void> {
    try {
      await privateInstance.delete(`${API_ENDPOINT}/${diagramId}`);
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(
        err.response?.status === 404
          ? "Diagram not found"
          : "Failed to delete diagram"
      );
    }
  }
}

export const diagramService = new DiagramService();
