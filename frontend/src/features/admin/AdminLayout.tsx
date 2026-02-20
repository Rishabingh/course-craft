import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function AdminLayout() {
  return (
    // Added 'flex' here
    <div className="flex w-full min-h-screen bg-neutral-100 text-neutral-900">
      <Sidebar />
      {/* Added main wrapper to control the content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}