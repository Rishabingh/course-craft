import { Link } from 'react-router';
import CourseCard from '../components/CourseCard';
import { IoBookOutline } from "react-icons/io5";

// Mock Data: Since this is "My Courses", we force isEnrolled: true
const MY_COURSES = [
  {
    id: '1',
    title: 'Complete React Course for Beginners',
    description: 'Learn React from scratch with practical projects, hooks, routing, and real-world patterns.',
    image: 'https://placehold.co/600x400?text=React+Course',
    price: 799,
    isEnrolled: true, 
  },
  {
    id: '2',
    title: 'Advanced Node.js API Masterclass',
    description: 'Master backend development using Node.js, Express, and MongoDB.',
    image: 'https://placehold.co/600x400?text=Node.js+API',
    price: 0,
    isEnrolled: true,
  },
];

export default function MyCoursePage() {
  const hasCourses = MY_COURSES.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 border-b border-neutral-200 pb-4 flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Learning</h1>
            <p className="text-neutral-500 mt-2">
              You are enrolled in <span className="font-semibold text-indigo-600">{MY_COURSES.length}</span> courses.
            </p>
          </div>
        </div>

        {/* Content Area */}
        {hasCourses ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MY_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          /* Empty State - Shows if no courses exist */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border border-neutral-200 shadow-sm">
            <div className="bg-indigo-50 p-4 rounded-full mb-4">
               {/* Simple SVG Icon for empty state */}
               <IoBookOutline className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No courses enrolled yet
            </h3>
            <p className="text-neutral-500 mb-6 max-w-sm">
              It looks like you haven't started your learning journey. Browse our catalog to find your first course.
            </p>
            <Link 
              to="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
