import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import useConnect from "./hooks/use-connect";
import { RootState } from "./app/store";
import { useSelector } from "react-redux";
import RootLayout from "./layouts/root-layout";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import TasksPage from "./pages/tasks/tasks-page";
import PrivateRoute from "./private/private-rote";
import Diagram from "./pages/diagram/diagram";
import SubLayout from "./layouts/sub-layout";

export default function App() {
  const { loading } = useSelector((state: RootState) => state.user);
  useConnect();

  if (loading) {
    return <p>Loading...</p>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "users",
          element: (
            <PrivateRoute roles={["admin", "super_admin"]}>
              <Users />
            </PrivateRoute>
          ),
        },
        {
          path: "tasks",
          element: <TasksPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/sub",
      element: <SubLayout />,
      children: [
        {
          path: "diagram",
          element: <Diagram />,
        },
        {
          path: "diagram/:id",
          element: <Diagram />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
