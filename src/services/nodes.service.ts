import { privateInstance } from "@/api/api-client";
import { INode } from "@/interfaces/nodes.interface";

const API_ENDPOINT = "/nodes";

export class NodesService {
  async createNodes(node: INode) {
    const res = await privateInstance.post<INode>(`${API_ENDPOINT}`, node);
    return res.data;
  }

  async deleteNodes({ node, diagram }: { node: string; diagram: string }) {
    const res = await privateInstance.delete(
      `${API_ENDPOINT}/${node}/${diagram}`
    );
    return res.data;
  }
}

export const nodesService = new NodesService();
