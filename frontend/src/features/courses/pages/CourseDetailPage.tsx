import { Link } from 'react-router';
import { MdPlayCircleOutline, MdCheck, MdOndemandVideo, MdOutlineAccessTime } from 'react-icons/md';
import { IoRibbonOutline } from 'react-icons/io5';

// Mock Data for the MVP
const MOCK_COURSE = {
  id: '123',
  title: 'Complete React Course for Beginners',
  subtitle: 'Master React by building real-world projects. Includes Hooks, Context API, React Router, and Redux.',
  description: 'Learn React from scratch with practical projects, hooks, routing, and real-world patterns used in modern frontend applications. This course is designed to take you from a complete beginner to a job-ready React developer.',
  price: 799,
  image: 'https://placehold.co/800x450?text=React+Masterclass',
  instructor: 'Hitesh Choudhary',
  lastUpdated: 'February 2026',
  isEnrolled: false, // Toggle this to see the button change
  curriculum: [
    {
      id: 'sec1',
      title: 'Getting Started with React',
      lectures: [
        { id: 'l1', title: 'Welcome to the Course', duration: '2:30' },
        { id: 'l2', title: 'Setting up your Environment (Node & Vite)', duration: '12:15' },
        { id: 'l3', title: 'JSX and How React works under the hood', duration: '18:40' },
      ],
    },
    {
      id: 'sec2',
      title: 'Core React Concepts',
      lectures: [
        { id: 'l4', title: 'Understanding Components and Props', duration: '15:20' },
        { id: 'l5', title: 'State management with useState', duration: '22:10' },
        { id: 'l6', title: 'Handling Events in React', duration: '10:05' },
      ],
    },
    {
      id: 'sec3',
      title: 'Advanced Patterns (Hooks)',
      lectures: [
        { id: 'l7', title: 'The useEffect hook deep dive', duration: '25:00' },
        { id: 'l8', title: 'Creating Custom Hooks', duration: '14:30' },
      ],
    },
  ],
};

export default function CourseDetailsPage() {
  const { title, subtitle, description, price, image, instructor, lastUpdated, isEnrolled, curriculum } = MOCK_COURSE;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Dark Header Hero Section */}
      <div className="bg-neutral-900 text-white py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Mobile Image (Shows only on small screens, on top as you requested) */}
          <div className="block md:hidden w-full aspect-video rounded-lg overflow-hidden mb-4 shadow-lg border border-neutral-700">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="md:w-2/3 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
            <p className="text-lg text-neutral-300">{subtitle}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mt-2">
              <span>Created by <span className="text-indigo-400 underline cursor-pointer">{instructor}</span></span>
              <span>•</span>
              <span>Last updated {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 relative">
        
        {/* Left Column: Course Details & Curriculum */}
        <div className="md:w-2/3 flex flex-col gap-12">
          
          {/* What you'll learn (Classic LMS pattern) */}
          <div className="border border-neutral-200 p-6 md:p-8 rounded-xl bg-neutral-50">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-700">
              <div className="flex gap-2"><MdCheck className="text-indigo-600 text-lg shrink-0" /> Build enterprise-level React applications</div>
              <div className="flex gap-2"><MdCheck className="text-indigo-600 text-lg shrink-0" /> Master React Hooks & Context API</div>
              <div className="flex gap-2"><MdCheck className="text-indigo-600 text-lg shrink-0" /> Integrate with backend APIs (MERN)</div>
              <div className="flex gap-2"><MdCheck className="text-indigo-600 text-lg shrink-0" /> State management with Redux Toolkit</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Description</h2>
            <p className="text-neutral-600 leading-relaxed">{description}</p>
          </div>

          {/* Curriculum Section */}
          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Course Content</h2>
            <div className="flex flex-col gap-4">
              {curriculum.map((section, index) => (
                <div key={section.id} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                  {/* Section Header */}
                  <div className="bg-neutral-50 px-6 py-4 font-semibold text-neutral-900 border-b border-neutral-200">
                    Section {index + 1}: {section.title}
                  </div>
                  {/* Lectures List */}
                  <div className="flex flex-col">
                    {section.lectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center justify-between px-6 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0">
                        <div className="flex items-center gap-3 text-neutral-700 text-sm">
                          <MdPlayCircleOutline className="text-indigo-600 text-lg" />
                          <span>{lecture.title}</span>
                        </div>
                        <span className="text-xs text-neutral-500 font-mono">{lecture.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Action Card (Desktop) */}
        <div className="hidden md:block md:w-1/3">
          {/* 'sticky top-24' keeps it on screen when scrolling past the header */}
          <div className="sticky top-24 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden -mt-40 z-10">
            {/* Desktop Image */}
            <div className="aspect-video w-full bg-neutral-200">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="text-3xl font-bold text-neutral-900">
                {price === 0 ? 'Free' : `₹${price}`}
              </div>

              {isEnrolled ? (
                <Link to={`/watch/${MOCK_COURSE.id}`} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-lg text-center transition-colors shadow-sm text-lg">
                  Continue Learning
                </Link>
              ) : (
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-sm text-lg">
                  Enroll Now
                </button>
              )}

              {/* Trust signals / Meta info */}
              <div className="flex flex-col gap-3 text-sm text-neutral-600 pt-4 border-t border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-1">This course includes:</h3>
                <div className="flex items-center gap-3"><MdOndemandVideo className="text-lg" /> 14 hours on-demand video</div>
                <div className="flex items-center gap-3"><IoRibbonOutline className="text-lg" /> Certificate of completion</div>
                <div className="flex items-center gap-3"><MdOutlineAccessTime className="text-lg" /> Full lifetime access</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Sticky Footer (Only shows on small screens if they haven't enrolled) */}
        {!isEnrolled && (
          <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between">
            <div className="text-2xl font-bold text-neutral-900">
               {price === 0 ? 'Free' : `₹${price}`}
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm">
              Enroll Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}