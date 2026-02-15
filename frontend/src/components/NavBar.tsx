import { Link } from 'react-router';
import { CgProfile } from 'react-icons/cg';
type UserState = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};
export default function NavBar({ userState }: { userState: UserState }) {
  const { isLoggedIn, isAdmin } = userState;

  let list: {text: string, route: string};
  if (isAdmin) {
    list = {text: 'Admin Pannel', route: '/admin'};
  } else if (isLoggedIn) {
    list = {text: 'My Courses', route: '/my-courses'};
  } else {
    list = {text: 'Login Now', route: '/login'};
  }
  return (
    <nav className="flex justify-between px-4 items-center h-16 shadow-lg gap-16">
      <div className="text-indigo-600 text-xl font-bold font-mono">Course-Craft</div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search for Course"
          className="w-full py-2 px-4 rounded-2xl ring-1 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <ul className="flex gap-10 items-center">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li className={!isLoggedIn ? 'bg-indigo-600 text-white px-2 py-1 rounded-md' : ''}>
          <Link to={list.route}>{list.text}</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to={'/me'}>
              <CgProfile className="text-2xl" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
