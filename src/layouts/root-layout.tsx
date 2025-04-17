import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
