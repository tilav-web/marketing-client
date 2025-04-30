import { RootState } from "@/app/store";
import Header from "@/components/header/header";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <Header>
          <SidebarTrigger />
        </Header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
