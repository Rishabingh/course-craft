import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-900 flex items-center justify-center">
      <div className="bg-neutral-200 rounded-lg flex p-8">
        <div className='w-lg flex flex-col justify-end gap-6'>
          <div className="text-3xl">Learn Smarter, Learn Faster, Learn Anywhere</div>
          <div>
            Start Learning new skills with our courses and Platform seamlessly across devices.
          </div>
        </div>
        {<Outlet />}
      </div>
    </div>
  );
}
