import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseInputSchema } from '../schemas/CourseInputSchema';
import type { CourseInput } from '../schemas/CourseInputSchema';
import { useCreateCourse } from '../hooks/useCreateCourse';

const CreateCoursePage = () => {
  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(CourseInputSchema),
  });

  const {mutateAsync, isPending,} = useCreateCourse();

  const onSubmit = async (data: CourseInput) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  // Helper string for common input styles to keep code clean
  const inputStyles = "w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-neutral-50 focus:bg-white";

  return (
    <div className="max-w-3xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Create New Course</h1>
        <p className="text-neutral-500 mt-2">Fill in the details below to add a new course to your catalog.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          
          {/* Title (Full Width) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-semibold text-sm text-neutral-700">Course Title</label>
            <input 
              type="text" 
              placeholder="e.g. Advanced React Patterns" 
              id="title" 
              {...register('title')} 
              className={`${inputStyles} ${errors.title ? 'border-red-500 focus:ring-red-100' : 'border-neutral-300'}`}
            />
            <div className="min-h-5">
              {errors.title && <span className="text-red-500 text-xs font-medium">{errors.title.message}</span>}
            </div>
          </div>

          {/* Description (Full Width) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-semibold text-sm text-neutral-700">Course Description</label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              placeholder="What will students learn in this course?"
              className={`${inputStyles} resize-y ${errors.description ? 'border-red-500 focus:ring-red-100' : 'border-neutral-300'}`}
            ></textarea>
            <div className="min-h-5">
              {errors.description && <span className="text-red-500 text-xs font-medium">{errors.description.message}</span>}
            </div>
          </div>

          {/* Grid for Price and Access Type (Side by Side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Price */}
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-semibold text-sm text-neutral-700">Price (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">₹</span>
                <input 
                  type="number" // Changed to number for better mobile keyboard
                  placeholder="799" 
                  {...register('price', { valueAsNumber: true })} // Ensure it parses as a number
                  id="price" 
                  className={`${inputStyles} pl-8 ${errors.price ? 'border-red-500 focus:ring-red-100' : 'border-neutral-300'}`}
                />
              </div>
              <div className="min-h-5">
                {errors.price && <span className="text-red-500 text-xs font-medium">{errors.price.message}</span>}
              </div>
            </div>

            {/* Access Type */}
            <div className="flex flex-col gap-1">
              <label htmlFor="accessType" className="font-semibold text-sm text-neutral-700">Access Type</label>
              <select 
                id="accessType" 
                defaultValue={'FREE'} 
                {...register('accessType')}
                className={`${inputStyles} ${errors.accessType ? 'border-red-500 focus:ring-red-100' : 'border-neutral-300'}`}
              >
                <option value="FREE">Free</option>
                <option value="PAID">Paid</option>
              </select>
              <div className="min-h-5">
                {errors.accessType && <span className="text-red-500 text-xs font-medium">{errors.accessType.message}</span>}
              </div>
            </div>

          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="font-semibold text-sm text-neutral-700">Course Thumbnail</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  // Added shouldValidate: true so the error clears immediately when they pick a file
                  setValue('image', e.target.files[0], { shouldValidate: true }); 
                }
              }}
            />
            <div className="min-h-5">
              {errors.image && <span className="text-red-500 text-xs font-medium">{errors.image.message}</span>}
            </div>
          </div>

          {/* Is Published Toggle */}
          <div className="flex items-center gap-3 pt-2 pb-4 border-b border-neutral-100">
            <input 
              type="checkbox" 
              {...register('isPublished')} 
              id="isPublished" 
              className="w-5 h-5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="isPublished" className="font-semibold text-neutral-800 cursor-pointer select-none">
              Publish immediately
              <p className="text-xs text-neutral-500 font-normal mt-0.5">If unchecked, this course will be saved as a draft.</p>
            </label>
            <div className="min-h-5 ml-auto">
              {errors.isPublished && (
                <span className="text-red-500 text-xs font-medium">{errors.isPublished.message}</span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col gap-2">
            <div className="min-h-5 text-center">
              {errors.root && <span className="text-red-500 text-sm font-medium">{errors.root.message}</span>}
            </div>
            
            <div className="flex justify-end gap-4">
              {/* Optional Cancel Button */}
              <button 
                type="button" 
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                onClick={() => reset()}
              >
                Clear Form
              </button>
              
              <button 
                type="submit"
                disabled={isPending}
                className={`px-8 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm ${
                  isPending
                    ? 'bg-neutral-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                }`}
              >
                {isPending ? 'Uploading Course...' : 'Create Course'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
