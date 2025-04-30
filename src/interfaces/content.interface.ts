import { IUser } from "./user.interface";

export enum ContentStatusEnum {
  PUBLISHED = "published",
  IDEA = "idea",
}

export interface IContent {
  _id: string;
  name: string;
  status: ContentStatusEnum;
  type: string;
  publish_date: string;
  assignedTo: IUser;
}
