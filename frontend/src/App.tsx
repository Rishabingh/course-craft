import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomeLayout from './features/courses/HomeLayout';
import HomePage from './features/courses/pages/HomePage';
import MyCoursePage from './features/courses/pages/MyCoursePage';
import CoursePage from './features/courses/pages/CoursePage';
import NotFoundPage from './shared/pages/NotFoundPage';
import AuthLayout from './features/auth/AuthLayout';
import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './features/admin/AdminLayout';
import DashboardPage from './features/admin/pages/Dashboard';
import Users from './features/admin/pages/Users';
import UserDetails from './features/admin/pages/UserDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/my-courses' element={<MyCoursePage />} />
        <Route path='/course/:id' element={<CoursePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<DashboardPage />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/users/:id' element={<UserDetails />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
