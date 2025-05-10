import { Outlet } from "react-router-dom";

export default function SubLayout() {
  return (
    <>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </>
  );
}
