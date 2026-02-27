import CourseCard from '../components/CourseCard';
import { RiVideoAddFill } from 'react-icons/ri';
import { Link } from 'react-router';
import { useAdminCourses } from '../hooks/useAdminCourses';

const AdminCoursePage = () => {
  const { data, isLoading } = useAdminCourses();
  if (isLoading) return <div>Loading ...</div>;
  return (
    <div>
      <Link
        className="flex items-center gap-2 border border-blue-600 w-fit p-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in cursor-pointer mb-4"
        to={'/admin/courses/new'}
      >
        <RiVideoAddFill className="text-xl" /> <span>Add New Course</span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((course) => (
          <CourseCard
            key={course._id}
            course={{
              id: course._id,
              title: course.title,
              description: course.description,
              image: course.thumbnail,
              price: course.price,
              isEnrolled: false,
              link: `/admin/courses/curriculum/${course._id}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminCoursePage;
