import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginInput } from '../schema/LoginInput.schema';
import { loginInputSchema } from '../schema/LoginInput.schema';
import { useId } from 'react';
import { Link } from 'react-router';

export default function LoginCard() {
  const {
    register,
    handleSubmit,
    //setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
  });

  const onSubmit = async() => {
    setTimeout(() => {
      console.log('submitted');
      reset();
    }, 3000)
  };
  const identifierId = useId();
  const passwordId = useId();
  return (
    <div>
      <div className='pb-8'>
        <div className='font-bold text-2xl'>
          Welcome Back!
        </div>
      <div className='text-neutral-700'>Log in to start learning with ease</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-2xs'>
        <div className='flex flex-col'>
          <label htmlFor={identifierId} className='pb-2 font-semibold'>Email or Username</label>
          <input
            type="text"
            id={identifierId}
            placeholder="Input your Email or Username"
            {...register('identifier')}
            disabled={isSubmitting}
            className='px-4 border-neutral-700 border py-2 rounded-lg'
          />
          <div className='min-h-4'>
            {errors.identifier && <span className="text-red-500">{errors.identifier.message}</span>}
          </div>

        </div>
        <div className='flex flex-col'>
          <label htmlFor={passwordId} className='pb-2 pt-4 font-semibold'>Password</label>
          <input
            type="text"
            id={passwordId}
            placeholder="Input your Password"
            {...register('password')}
            disabled={isSubmitting}
            className='px-4 border-neutral-700 border py-2 rounded-lg'
          />
          <div className='min-h-5'>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
        </div>
        <div className='pt-8'>
          <button 
          className={`${isSubmitting ? 'bg-neutral-500' : 'bg-neutral-800'} text-center text-neutral-100 w-full rounded-2xl py-2 cursor-pointer`}
          type='submit' disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
          <div className='min-h-5'>
            {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          </div>
        </div>
      </form>

      <div className='text-neutral-400 pt-4'>Don't have an account?<Link to={'/register'} className='font-bold text-neutral-900'> Sign up here</Link></div>
    </div>

  );
}
