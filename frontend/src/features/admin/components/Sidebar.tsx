import { NavLink } from "react-router";
import { MdDashboard, MdPerson2 } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { IoBagHandle, IoSettings } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";

// 1. Store your navigation items in an array
const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: MdDashboard, exact: true },
  { name: 'Users', path: '/admin/users', icon: MdPerson2 },
  { name: 'Courses', path: '/admin/courses', icon: FaLaptopCode },
  { name: 'Orders', path: '/admin/orders', icon: IoBagHandle },
  { name: 'Coupons', path: '/admin/coupons', icon: BiSolidDiscount },
  { name: 'Analytics', path: '/admin/analytics', icon: ImStatsDots },
];

export default function Sidebar() {
  return (
    // 'w-64' is a standard 16rem width. Added border-r for a clean separation.
    <aside className="sticky left-0 top-0 w-64 h-screen bg-white border-r border-neutral-200 flex flex-col z-40">
      
      {/* 2. Logo / Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <span className="text-xl font-bold font-mono text-indigo-600 tracking-tighter">
          CourseCraft Admin
        </span>
      </div>

      {/* 3. Main Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact} // Prevents '/admin/users' from also highlighting '/admin'
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600' // Active state styling
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900' // Inactive state styling
              }`
            }
          >
            {/* Render the icon component dynamically */}
            <item.icon className="text-lg" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* 4. Settings pinned to the bottom */}
      <div className="p-4 border-t border-neutral-200">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            }`
          }
        >
          <IoSettings className="text-lg" />
          Settings
        </NavLink>
      </div>
      
    </aside>
  );
}