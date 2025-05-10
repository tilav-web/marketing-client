import { GitFork, Home, LucideProps, Table2, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
type Roles = "user" | "super_admin" | "admin";

export const menu: {
  link: string;
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  roles: Roles[];
}[] = [
  {
    link: "/dashboard",
    title: "Dashboard",
    icon: Home,
    roles: ["admin", "super_admin", "user"],
  },
  {
    link: "/sub/diagram",
    title: "Diagram",
    icon: GitFork,
    roles: ["admin", "super_admin", "user"],
  },
  {
    link: "/dashboard/users",
    title: "Users",
    icon: User,
    roles: ["admin", "super_admin"],
  },
  {
    link: "/dashboard/tasks",
    title: "Tasks",
    icon: Table2,
    roles: ["admin", "super_admin", "user"],
  },
];
