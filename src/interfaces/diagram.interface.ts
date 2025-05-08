import { IShape } from "./shape.interface";

export interface IDiagram {
  _id?: string;
  name: string;
  shapes: IShape[];
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
