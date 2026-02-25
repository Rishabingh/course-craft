import { Link } from 'react-router';
import CourseCard from '../components/CourseCard';
import { IoBookOutline } from 'react-icons/io5';
import { useMyCourse } from '../hooks/useMyCourse';

export default function MyCoursePage() {
  const { data, isLoading } = useMyCourse();

  if (isLoading) return <div>Loading...</div>;
  const hasCourses: boolean = data.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 border-b border-neutral-200 pb-4 flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Learning</h1>
            <p className="text-neutral-500 mt-2">
              You are enrolled in{' '}
              <span className="font-semibold text-indigo-600">{data.length}</span> courses.
            </p>
          </div>
        </div>

        {/* Content Area */}
        {hasCourses ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((course) => (
              <CourseCard
                key={course._id}
                course={{
                  id: course._id,
                  title: course.title,
                  description: course.description,
                  image: course.thumbnail,
                  price: course.price,
                  isEnrolled: true,
                }}
              />
            ))}
          </div>
        ) : (
          /* Empty State - Shows if no courses exist */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border border-neutral-200 shadow-sm">
            <div className="bg-indigo-50 p-4 rounded-full mb-4">
              {/* Simple SVG Icon for empty state */}
              <IoBookOutline className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No courses enrolled yet</h3>
            <p className="text-neutral-500 mb-6 max-w-sm">
              It looks like you haven't started your learning journey. Browse our catalog to find
              your first course.
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
