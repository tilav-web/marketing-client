import { IEdge } from "./edges.interface";
import { INode } from "./nodes.interface";

export interface IDiagram {
  _id?: string;
  title: string;
  nodes: INode[];
  edges: IEdge[];
  user: string;
}
