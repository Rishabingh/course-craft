import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import { useUser } from '../../shared/hooks/useUser';

export default function HomeLayout() {
  const { data, isLoading, } = useUser();
  const isLoggedIn = !!data;
  let isAdmin: boolean = false;
  if (data) {
    isAdmin = data.role === 'admin'
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-900">
      <NavBar userState={{ isLoggedIn, isAdmin, }} />
      {<Outlet />}
    </div>
  );
}
