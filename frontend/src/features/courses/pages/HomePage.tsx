import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';

export default function HomePage() {
  const { data, isLoading } = useCourses();
  console.log(data);
  if (isLoading) return <div>Loading ...</div>;
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* 1. Hero Section - Sets the mood and welcomes the user */}
      <section className="bg-indigo-600 text-white py-16 px-10 shadow-md">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Level Up Your Skills</h1>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Explore our curated list of practical, project-based courses and start building
            real-world applications today.
          </p>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="px-10 max-w-7xl mx-auto w-full">
        {/* Enhanced Section Header */}
        <div className="mb-8 border-b border-neutral-200 pb-4">
          <h2 className="text-2xl font-bold text-neutral-900">Featured Courses</h2>
          <p className="text-neutral-500 mt-1">Pick up where you left off or find something new.</p>
        </div>

        {/* 3. CSS Grid - Replaces Flexbox for perfect alignment */}
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
                isEnrolled: true,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
