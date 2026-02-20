import { Outlet } from "react-router";
import NavBar from './components/NavBar';

export default function HomeLayout() {
  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-900">
      <NavBar userState={{isLoggedIn: true, isAdmin: false}} />
      {<Outlet />}
    </div>
  )
}
                   