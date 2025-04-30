import { RootState } from "@/app/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Roles = "user" | "super_admin" | "admin";

interface IProps {
  children: ReactNode;
  roles: Roles[];
}

export default function PrivateRoute({ roles, children }: IProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    navigate("/login");
    return null;
  }

  if (user?.role && !roles.includes(user?.role)) {
    return null;
  }

  return children;
}
