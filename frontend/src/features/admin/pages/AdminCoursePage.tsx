import React from 'react';
import UsersFilters from '../components/UsersFilters';
import CourseCard from '../components/CourseCard';
import { RiVideoAddFill } from "react-icons/ri";
import { Link } from 'react-router';

const AdminCoursePage = () => {
  return (
    <div>
      <UsersFilters />

      <Link className='flex items-center gap-2 border border-blue-600 w-fit p-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in cursor-pointer mb-4' to={'/admin/course/new'}>
        <RiVideoAddFill className='text-xl' /> <span>Add New Course</span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CourseCard
          course={{
            id: '1',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns.',
            title: 'Complete React Course for Beginners',
            price: 799,
          }}
        />
        <CourseCard
          course={{
            id: '2',
            description: 'Master backend development using Node.js, Express, and MongoDB.',
            title: 'Advanced Node.js API Masterclass',
            price: 0,
          }}
        />
        <CourseCard
          course={{
            id: '3',
            description: 'Build beautiful, responsive layouts quickly using utility-first CSS.',
            title: 'Tailwind CSS from Zero to Hero',
            price: 499,
          }}
        />
        <CourseCard
          course={{
            id: '4',
            description: 'Understand the core concepts of JavaScript to become a better developer.',
            title: 'JavaScript Fundamentals',
            price: 799,
          }}
        />
        <CourseCard
          course={{
            id: '5',
            description: 'Deploy your applications to the cloud using Vercel, Netlify, and AWS.',
            title: 'Modern Deployment Strategies',
            price: 799,
          }}
        />
      </div>
    </div>
  );
};

export default AdminCoursePage;
