import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import AdminCurriculumSection from '../components/AdminCurriculumSection';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionInputSchema, type SectionInput } from '../schemas/SectionInputSchema';

// Hooks
import { useCourse } from '../hooks/useCourse';
import { useSections } from '../hooks/useSections';
import { useCreateSection } from '../hooks/useCreateSection';

export default function CourseCurriculumPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Safety Check (Must be inside useEffect)
  useEffect(() => {
    if (!id) {
      navigate('/admin');
    }
  }, [id, navigate]);

  // 2. Fetch Data
  const { data: courseData, isLoading: isCourseLoading } = useCourse(id as string);
  const { data: sectionData, isLoading: isSectionsLoading } = useSections(id as string);
  const { mutateAsync: mutateSection, isPending } = useCreateSection();

  // 3. Form Setup
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SectionInput>({
    resolver: zodResolver(SectionInputSchema),
  });

  // 4. Map Backend Data to UI Props
  // Mongoose uses _id and name. We map it to what the UI expects.
  const formattedSections = (sectionData || []).map((sec: any) => ({
    id: sec._id,
    title: sec.name,
    lectures: (sec.videos || []).map((vid: any) => ({
      id: vid._id,
      title: vid.title,
      duration: '10:00', // Fake duration for MVP
    })),
  }));

  const handleAddSection = async (data: SectionInput) => {
    try {
      const newData = {
        name: data.name,
        course: id as string,
        index: formattedSections.length + 1, // Dynamically set the index
      };
      await mutateSection(newData);
      reset(); // Clear the input field after successful creation
    } catch (error) {
      console.error("Failed to create section:", error);
    }
  };

  if (isCourseLoading || isSectionsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 bg-indigo-600 rounded-full animate-bounce"></div>
          <p className="text-neutral-500 font-medium">Loading Curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* 1. Page Header */}
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-4 transition-colors"
        >
          <MdArrowBack /> Back to Courses
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-neutral-900">{courseData?.title}</h1>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                courseData?.isPublished 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {courseData?.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-neutral-500 text-sm line-clamp-2 max-w-2xl">{courseData?.description}</p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm whitespace-nowrap">
            {courseData?.isPublished ? 'Done' : 'Publish Course'}
          </button>
        </div>
      </div>

      {/* 2. Curriculum Builder Area */}
      <div className="flex flex-col gap-6">
        
        {/* Render Existing Sections */}
        {formattedSections.map((section: any) => (
          <AdminCurriculumSection
            key={section.id}
            section={section}
            actions={() => {
              console.log('Action clicked for', section.id);
            }}
          />
        ))}

        {/* 3. Add New Section Inline Form */}
        <form
          onSubmit={handleSubmit(handleAddSection)}
          className="w-full bg-white rounded-xl border-2 border-dashed border-neutral-300 p-6 hover:border-indigo-300 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-neutral-700">
              New Section Name
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  placeholder="e.g. Introduction to React"
                  disabled={isPending}
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${
                    errors.name ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-neutral-50 focus:bg-white'
                  }`}
                />
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all shadow-sm h-[46px] ${
                  isPending 
                    ? 'bg-neutral-400 cursor-not-allowed' 
                    : 'bg-neutral-900 hover:bg-neutral-800 hover:shadow-md'
                }`}
              >
                <MdAdd className="text-lg" />
                <span>{isPending ? 'Saving...' : 'Add Section'}</span>
              </button>
            </div>
            
            {/* Error Handling */}
            <div className="min-h-5 mt-1">
              {errors.name && <span className="text-red-500 text-xs font-medium">{errors.name.message}</span>}
              {errors.root && <span className="text-red-500 text-xs font-medium">{errors.root.message}</span>}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
