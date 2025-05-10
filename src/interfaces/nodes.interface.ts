export interface NodeData {
  label?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  color?: string;
  rotate?: number;
}

export interface INode {
  _id?: string;
  diagram: string;
  id: string;
  type: string; // e.g. 'custom'
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}
