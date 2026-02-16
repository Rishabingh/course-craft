import { Link } from 'react-router';
import { CgProfile } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi'; // Added a search icon for polish

type UserState = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

export default function NavBar({ userState }: { userState: UserState }) {
  const { isLoggedIn, isAdmin } = userState;

  // Determine the primary action button content
  const getAuthAction = () => {
    if (isAdmin) return { text: 'Admin Panel', route: '/admin', style: 'primary' };
    if (isLoggedIn) return { text: 'My Courses', route: '/my-courses', style: 'secondary' };
    return { text: 'Login', route: '/login', style: 'primary' };
  };

  const action = getAuthAction();

  return (
    // Added sticky top-0 and z-50 so navbar stays visible while scrolling
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-8">
        
        {/* 1. Logo - Wrapped in Link */}
        <Link to="/" className="text-indigo-600 text-xl font-bold font-mono tracking-tighter hover:opacity-80 transition-opacity">
          CourseCraft
        </Link>

        {/* 2. Search Bar - Added max-w-md to prevent it from stretching too wide */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full py-2 pl-10 pr-4 bg-neutral-100 rounded-full border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* 3. Navigation Links */}
        <ul className="flex items-center gap-6">
          {/* Removed explicit "Home" link (Logo handles this) */}
          
          {/* The Action Button */}
          <li>
            <Link 
              to={action.route}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                action.style === 'primary' 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm' 
                  : 'text-neutral-600 hover:text-indigo-600 hover:bg-neutral-50'
              }`}
            >
              {action.text}
            </Link>
          </li>

          {/* Profile Icon - Only if logged in */}
          {isLoggedIn && (
            <li>
              <Link to="/me" className="text-neutral-600 hover:text-indigo-600 transition-colors">
                <CgProfile className="text-2xl" />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
