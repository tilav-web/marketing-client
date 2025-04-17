export interface IUser {
  _id: string;
  name: string;
  email: string;
  provider: string;
  avatar?: string;
  role: "user" | "admin" | "super_admin";
}
