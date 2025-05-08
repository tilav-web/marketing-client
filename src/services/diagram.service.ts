import { privateInstance } from "@/api/api-client";
import { IDiagram } from "@/interfaces/diagram.interface";

const API_ENDPOINT = "/diagrams";

export class DiagramService {
  // Fetch all diagrams
  async fetchDiagrams(userId: string): Promise<IDiagram[]> {
    try {
      const response = await privateInstance.get(`${API_ENDPOINT}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch diagrams: ${error}`);
    }
  }

  async fetchById(id: string): Promise<IDiagram> {
    try {
      const res = await privateInstance.get(`${API_ENDPOINT}/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(`Failed to fetch diagram: ${error}`);
    }
  }

  // Fetch a single diagram by ID
  async fetchDiagram(id: string): Promise<IDiagram> {
    try {
      const response = await privateInstance.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch diagram: ${error}`);
    }
  }

  // Create a new diagram
  async createDiagram(diagram: IDiagram): Promise<IDiagram> {
    try {
      const response = await privateInstance.post(
        `${API_ENDPOINT}/${diagram.userId}`,
        diagram
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create diagram: ${error}`);
    }
  }

  // Update an existing diagram
  async updateDiagram(id: string, diagram: IDiagram): Promise<IDiagram> {
    try {
      const response = await privateInstance.put(
        `${API_ENDPOINT}/${id}`,
        diagram
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update diagram: ${error}`);
    }
  }

  // Delete a diagram
  async deleteDiagram(id: string): Promise<void> {
    try {
      await privateInstance.delete(`${API_ENDPOINT}/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete diagram: ${error}`);
    }
  }
}

export const diagramService = new DiagramService();
