import CourseCard from '../components/CourseCard';
export default function HomePage() {
  return (
    <div className="p-10">

      <div className='flex gap-5 flex-wrap w-full justify-between'>
        <CourseCard
          course={{
            isEnrolled: false,
            id: '123456',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications.',
            title: 'Complete React Course for Beginners',
            price: 799,
          }}
        />
        <CourseCard
          course={{
            isEnrolled: true,
            id: '123456',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications.',
            title: 'Complete React Course for Beginners',
            price: 0,
          }}
        />
        <CourseCard
          course={{
            isEnrolled: false,
            id: '123456',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications.',
            title: 'Complete React Course for Beginners',
            price: 0,
          }}
        />
        <CourseCard
          course={{
            isEnrolled: true,
            id: '123456',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications.',
            title: 'Complete React Course for Beginners',
            price: 799,
          }}
        />
        <CourseCard
          course={{
            isEnrolled: false,
            id: '123456',
            description:
              'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications.',
            title: 'Complete React Course for Beginners',
            price: 799,
          }}
        />
      </div>

    </div>
  );
}
