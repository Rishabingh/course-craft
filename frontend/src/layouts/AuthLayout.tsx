import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-900">
      {<Outlet />}
    </div>
  )
}
