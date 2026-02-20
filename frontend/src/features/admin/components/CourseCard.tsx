import { Link } from 'react-router';

type CourseParams = {
  image?: string;
  title: string;
  description: string;
  id: string;
  price: number;
};

export default function CourseCard({ course }: { course: CourseParams }) {
  const { title, image, description, id, price } = course;

  let priceText = '';
  if (price === 0) {
    priceText = 'Free';
  } else {
    priceText = `₹${price}`;
  }

  return (
    <Link
      className="max-w-xs w-full flex flex-col gap-3 border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer hover:bg-neutral-50"
      to={`/admin/course/${id}`}
    >
      {/* Image */}
      <div className="aspect-video w-full">
        <img
          src={image || 'https://placehold.co/1200x750'}
          alt="Course Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 pt-1">
        <h2 className="font-semibold text-lg leading-tight text-neutral-900 line-clamp-2">
          {title}
        </h2>

        <p className="text-sm text-neutral-600 line-clamp-3">{description}</p>

        {/* Footer */}
        <div className="mt-2 flex items-center justify-between pt-3 border-t border-neutral-100">
          <span className='font-bold text-lg text-neutral-900'>{priceText}</span>

          <div className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
            View Course
          </div>
        </div>
      </div>
    </Link>
  );
}