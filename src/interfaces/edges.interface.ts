export interface EdgeData {
  label?: string;
  animated?: boolean;
  style?: {
    stroke?: string;
    strokeWidth?: number;
  };
}

export interface IEdge {
  _id?: string;
  id: string; // e.g. 'e1-2'
  source: string;
  target: string;
  type?: string;
  data?: EdgeData;
  label?: string;
  animated?: boolean;
  style?: {
    stroke?: string;
    strokeWidth?: number;
  };
}
