export default function Home() {
  return (
    <div>
      <header className='w-full h-20 text-center bg-[#31363F] text-white'>
        HEADER
      </header>
      <div className='bg-gray-400 bg-home-img bg-cover bg-center bg-fixed'>
        <main className='flex flex-col w-full h-dvh'>
          <div className='flex flex-col gap-6 p-12 text-center rounded-xl bg-black/70 w-4/5 mx-auto my-8 text-white'>
            <h1 className='text-4xl font-bold'>Welcome To Practice Pro</h1>
            <p className='text-2xl'>Your Best Music Practice Diary</p>
          </div>

          <div className='bg-white/90 w-4/5 h-[300px] mx-auto my-8 rounded-xl'>
            Login/Signin form
          </div>
        </main>
      </div>
    </div>
  );
}

{
  /* <div className='flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-xl mx-auto text-white sm:text-2xl'>
            <div className='flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-xl mx-auto text-white sm:text-2xl'>
              <h1 className='text-4xl font-bold'>Welcome To Practice Pro</h1>
              <p>Your Best Music Practice Diary</p>
            </div>
          </div>
          <div>
            <div className='flex flex-col justify-center gap-6 p-12 rounded-xl bg-white/90 w-3/5 h-3/5 mx-auto  sm:text-2xl'>
              <h1 className='text-4xl font-bold'>Welcome To Practice Pro</h1>
              <p>Your Best Music Practice Diary</p>
            </div>
          </div> */
}
