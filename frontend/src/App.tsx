import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomeLayout from './features/courses/HomeLayout';
import HomePage from './features/courses/pages/HomePage';
import MyCoursePage from './features/courses/pages/MyCoursePage';
import CourseDetailsPage from './features/courses/pages/CourseDetailPage';
import NotFoundPage from './shared/pages/NotFoundPage';
import AuthLayout from './features/auth/AuthLayout';
import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './features/admin/AdminLayout';
import DashboardPage from './features/admin/pages/Dashboard';
import Users from './features/admin/pages/Users';
import UserDetails from './features/admin/pages/UserDetails';
import AdminCoursePage from './features/courses/pages/AdminCoursePage';
import AnalyticsPage from './features/admin/pages/AnalyticsPage';
import CreateCoursePage from './features/courses/pages/CreateCoursePage';
import SignupPage from './features/auth/pages/SignupPage';
import OtpVerificationPage from './features/auth/pages/OtpVerificationPage';
import CourseCurriculumPage from './features/courses/pages/CourseCurriculumPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/my-courses' element={<MyCoursePage />} />
        <Route path='/course/:id' element={<CourseDetailsPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />
        <Route path='/verify-email' element={<OtpVerificationPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin' element={<DashboardPage />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/users/:id' element={<UserDetails />} />
        <Route path='/admin/courses' element={<AdminCoursePage />} />
        <Route path='/admin/courses/new' element={<CreateCoursePage />} />
        <Route path='/admin/courses/curriculum/:id' element={<CourseCurriculumPage />} />
        <Route path='/admin/analytics' element={<AnalyticsPage />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
