import { ListMusic, LayoutDashboard, BookA } from "lucide-react";
import Link from "next/link";

import { NavButton } from "@/components/NavButton";

export function Header() {
  return (
    <header className='animate-slide bg-[#146C94] h-14 p-2 sticky top-0 z-20'>
      <div className='flex h-10 items-center justify-between lg:max-w-7xl border-b lg:mx-auto'>
        <div className='flex items-center gap-2'>
          <div>
            <NavButton href='/' label='Home' icon={ListMusic} />
          </div>

          <Link
            href='/'
            className='flex justify-center items-center gap-2 ml-0'
            title='Home'
          >
            <h1 className='text-white hidden sm:block text-xl font-bold m-0'>
              Practice Pro
            </h1>
          </Link>
        </div>

        <div className='flex items-center gap-2'>
          <NavButton
            href='/dashboard'
            label='Dashboard'
            icon={LayoutDashboard}
          />

          <NavButton href='/about' label='About' icon={BookA} />
        </div>
      </div>
    </header>
  );
}
