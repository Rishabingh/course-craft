import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center bg-neutral-50 gap-6 text-center px-4">
      
      {/* 1. Large Visual Element */}
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">
        404
      </h1>

      {/* 2. Helpful Context */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          Page Not Found
        </h2>
        <p className="text-neutral-500 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed or the link is broken.
        </p>
      </div>

      {/* 3. Strong Call to Action */}
      <Link
        to="/"
        className="mt-4 px-6 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
      >
        <span>←</span> Back to Home
      </Link>
    </div>
  );
}
