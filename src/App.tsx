import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import useConnect from "./hooks/use-connect";
import { RootState } from "./app/store";
import { useSelector } from "react-redux";

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
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
