import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema } from "../schema/OtpSchema";
import type { OtpInput } from "../schema/OtpSchema";
import { useOtpVerify } from "../hooks/useOtpVerify";
import { resendOtp } from "../hooks/useResendOtp";
import toast from "react-hot-toast";
import { AxiosError } from "axios";


const OtpVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your email"; // Fallback if missing

  const {mutateAsync, isPending} = useOtpVerify();
  
  // Timer State (300 seconds = 5 minutes)
  const [timeLeft, setTimeLeft] = useState(300);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(OtpSchema),
  });

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: OtpInput) => {
    await mutateAsync(data);
  };

  const handleResend = async () => {
    // Reset timer
    try {
      if (email) {
        await resendOtp({email});
        toast.success('otp resended')
      } else {
        toast.error('email is missing, try to signup again on signup page')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message)
      } else {
        toast.error('something went wrong try to resend otp again or signup again on signup page')
      }
    }
    setTimeLeft(300); 
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="pb-8">
        <h2 className="font-bold text-3xl text-neutral-900 mb-2">
          Verify your Email
        </h2>
        <p className="text-neutral-500 leading-relaxed">
          We've sent a 6-digit verification code to <br />
          <span className="font-semibold text-neutral-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        
        {/* OTP Input Field */}
        <div className="flex flex-col gap-1">
          <input 
            type="text"
            inputMode="numeric" // Shows number pad on mobile!
            maxLength={6}
            placeholder="••••••"
            {...register('otp')}
            disabled={isPending}
            // The tracking-[1em] spreads the letters out to look like a code input
            className={`w-full text-center text-3xl tracking-[1em] font-mono py-4 rounded-xl border outline-none transition-all placeholder:tracking-normal ${
              errors.otp 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-neutral-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-neutral-50 focus:bg-white'
            }`}
          />
          <div className="min-h-5 text-center mt-1">
            {errors.otp && <span className="text-red-500 text-sm font-medium">{errors.otp.message}</span>}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            disabled={isPending}
            className={`w-full rounded-xl py-3.5 font-semibold text-white transition-all shadow-sm text-lg ${
              isPending 
                ? 'bg-neutral-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
            }`}
          >
            {isPending ? 'Verifying...' : 'Verify Code'}
          </button>
        </div>

      </form>

      {/* Timer and Resend Logic */}
      <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm">
        {timeLeft > 0 ? (
          <p className="text-neutral-500">
            Code expires in <span className="font-mono font-bold text-indigo-600">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <p className="text-red-500 font-medium">Code has expired.</p>
        )}

        <div className="text-neutral-500 mt-2">
          Didn't receive the code?{' '}
          <button 
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-bold transition-colors ${
              timeLeft > 0 
                ? 'text-neutral-300 cursor-not-allowed' 
                : 'text-indigo-600 hover:text-indigo-800 hover:underline'
            }`}
          >
            Resend Code
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
          ← Back to Login
        </Link>
      </div>

    </div>
  );
};

export default OtpVerificationPage;