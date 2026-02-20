import React from 'react';

const UsersFilters = () => {
  return (
    <div className="p-5 rounded-lg shadow-sm mb-6">
      {/* Search Bar */}
      <div className="w-full flex gap-10 items-center">
        <input
          type="text"
          placeholder="Search by username or email or id"
          className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button className="px-6 py-3 text-sm rounded-full bg-blue-600 text-white">
          Search
        </button>
      </div>

      {/* Filter Capsules */}
      <div className="flex flex-wrap gap-3 mt-5">
        <button className="px-4 py-1.5 text-sm rounded-full bg-blue-600 text-white">
          All Users
        </button>

        <button className="px-4 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
          Active
        </button>

        <button className="px-4 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
          Blocked
        </button>

        <button className="px-4 py-1.5 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
          Deleted
        </button>
      </div>
    </div>
  );
};

export default UsersFilters;
