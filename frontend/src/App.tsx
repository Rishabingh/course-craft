import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import MyCoursePage from './pages/MyCoursePage';
import CoursePage from './pages/CoursePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/LoginPage';

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

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
