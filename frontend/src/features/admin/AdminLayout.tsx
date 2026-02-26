import { Navigate, Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { useUser } from "../../shared/hooks/useUser";

export default function AdminLayout() {
  const {data, isLoading} = useUser();
  if (isLoading) return <div>Loading...</div>
  if (data?.role !== 'admin' || !data) {
    return <Navigate to={'/'} />
  }
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