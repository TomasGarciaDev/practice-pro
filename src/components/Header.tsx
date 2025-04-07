import { ListMusic, LayoutDashboard, BookA, LogOut } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/NavButton";
import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className='animate-slide bg-background h-14 p-2 sticky top-0 z-20'>
      <div className='flex h-10 items-center justify-between lg:max-w-7xl border-b border-foreground lg:mx-auto'>
        <div className='flex items-center gap-2'>
          <div>
            <NavButton href='/' label='Home' icon={ListMusic} />
          </div>

          <Link
            href='/'
            className='flex justify-center items-center gap-2 ml-0'
            title='Home'
          >
            <h1 className='hidden sm:block text-xl font-bold m-0'>
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

          <ModeToggle />

          <Button
            variant='ghost'
            size='icon'
            aria-label='LogOut'
            title='LogOut'
            className='rounded-full'
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
