import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import { useUser } from '../../shared/hooks/useUser';
import { useState } from 'react';

export default function HomeLayout() {
  const { data, isLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  if (data) setIsLoggedIn(true);
  if (data?.role === 'admin') setIsAdmin(true);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-900">
      <NavBar userState={{ isLoggedIn, isAdmin, }} />
      {<Outlet />}
    </div>
  );
}
