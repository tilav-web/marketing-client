export interface IShape {
  _id?: string;
  content: string;
  size: {
    width: number;
    height: number;
  };
  colors: {
    background: string;
    text: string;
  };
  position: {
    x: number;
    y: number;
  };
  diagram: string;
  united?: Array<{
    id: string;
    part: "top" | "bottom" | "left" | "right";
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NodeData extends IShape {
  id: string;
  selected?: boolean;
}
