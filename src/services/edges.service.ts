import { privateInstance } from "@/api/api-client";

const API_ENDPOINT = "/edges";

export class EdgesService {
  async createEdges({
    source,
    target,
    id,
    diagram,
  }: {
    source: string;
    target: string;
    id: string;
    diagram: string;
  }) {
    const res = await privateInstance.post(`${API_ENDPOINT}`, {
      source,
      target,
      id,
      diagram,
    });
    return res.data;
  }

  async deleteEdges({ edge, diagram }: { edge: string; diagram: string }) {
    const res = await privateInstance.delete(
      `${API_ENDPOINT}/${edge}/${diagram}`
    );
    return res.data;
  }
}

export const edgesService = new EdgesService();
