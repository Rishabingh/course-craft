import { useSignup } from "../hooks/useSignup"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpInputSchema, type SingnUpInput } from "../schema/SignupInputSchema";
import { Link } from "react-router"; // Assuming you are using react-router

const SignupPage = () => {
  const { mutateAsync, isPending } = useSignup();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm<SingnUpInput>({
    resolver: zodResolver(SignUpInputSchema)
  });

  const onSubmit = async (data: SingnUpInput) => {
    try {
      await mutateAsync(data);
      reset();
      // Optional: Redirect to OTP page or show success message here
    } catch (error) {
      // Handle API errors if useSignup doesn't handle them automatically
      console.error(error);
    }
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="pb-8">
        <h2 className="font-bold text-3xl text-neutral-900 mb-2">
          Create an Account
        </h2>
        <p className="text-neutral-500">
          Join us today and start your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm text-neutral-700">
            Email Address
          </label>
          <input 
            type="email" // Changed from text to email for better UX
            id="email"
            placeholder="e.g. alex@example.com"
            {...register('email')}
            disabled={isPending}
            className={`px-4 py-2.5 rounded-lg border outline-none transition-all ${
              errors.email 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {/* Reserved Error Space */}
          <div className="min-h-5">
            {errors.email && <span className="text-red-500 text-xs font-medium">{errors.email.message}</span>}
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-sm text-neutral-700">
            Password
          </label>
          <input 
            type="password" 
            id="password"
            placeholder="Create a secure password"
            {...register('password')}
            disabled={isPending}
            className={`px-4 py-2.5 rounded-lg border outline-none transition-all ${
              errors.password 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {/* Reserved Error Space */}
          <div className="min-h-5">
            {errors.password && <span className="text-red-500 text-xs font-medium">{errors.password.message}</span>}
          </div>
        </div>

        {/* Submit Button & Root Error */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isPending}
            className={`w-full rounded-lg py-2.5 font-medium text-white transition-all shadow-sm ${
              isPending 
                ? 'bg-neutral-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
            {isPending ? 'Sending OTP...' : 'Send OTP'}
          </button>
          
          <div className="min-h-5 text-center mt-2">
            {errors.root && <span className="text-red-500 text-sm font-medium">{errors.root.message}</span>}
          </div>
        </div>

      </form>

      {/* Footer Link */}
      <div className="text-neutral-500 text-sm text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          Log in here
        </Link>
      </div>
    </div>
  )
}

export default SignupPage;