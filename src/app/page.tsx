export default function Home() {
  return (
    <main className='w-full lg:max-w-7xl lg:mx-auto'>
      <div className='flex flex-col lg:grid lg:grid-cols-2 lg:py-16'>
        {/* Left content */}
        <div className='my-auto'>
          <div className='flex flex-col gap-6 lg:p-12 sm:p-4 text-center rounded-xl w-4/5 mx-auto my-8 text-white'>
            <h1 className='text-5xl font-bold'>Welcome To Practice Pro</h1>
            <p className='text-3xl'>Your Best Music Practice Diary</p>
          </div>
        </div>

        {/* Right content (Login/Signup) */}
        <div className='my-auto'>
          <div className='bg-white/90 w-4/5 h-[600px] mx-auto rounded-xl'>
            Login/Signin form
          </div>
        </div>
      </div>
    </main>
  );
}
