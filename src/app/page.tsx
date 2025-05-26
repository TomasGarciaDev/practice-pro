import { LayoutDashboard, ListMusic, LogOut } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/NavButton";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();

  return (
    <main>
      <div className='flex flex-col lg:grid lg:grid-cols-2 lg:py-16'>
        {/* Left content */}
        <div className='my-auto'>
          <div className='flex flex-col gap-6 lg:p-12 p-8 text-center rounded-xl w-4/5 mx-auto my-8 bg-background/70'>
            <h1 className='text-5xl font-bold'>Welcome To Practice Pro</h1>
            <p className='text-3xl'>Your Best Music Practice Companion</p>
          </div>
        </div>

        {/* Right content (Login/Signup) */}
        <div className='my-auto flex flex-col justify-center items-center'>
          <div className='bg-background/70 w-4/5 h-full mx-auto rounded-xl flex flex-col items-center gap-6 text-4xl p-10'>
            <div className='flex justify-center items-center bg-background/70 rounded-full p-4'>
              <ListMusic className='w-24 h-24 text-foreground' />
            </div>

            {!isUserAuthenticated ? (
              <div className='flex flex-col w-full gap-6 items-center'>
                Login
                <Button size='lg' asChild>
                  <LoginLink>Sign In</LoginLink>
                </Button>
                <div className='border-b border-foreground w-full'></div>
                or Sign Up
                <Button size='lg' asChild>
                  <RegisterLink>Create Account</RegisterLink>
                </Button>
              </div>
            ) : (
              <div className='flex flex-col w-full gap-6 items-center'>
                Go to Dashboard
                <NavButton
                  href='/dashboard'
                  label='Dashboard'
                  icon={LayoutDashboard}
                />
                <div className='border-b border-foreground w-full'></div>
                LogOut
                <Button
                  variant='ghost'
                  size='icon'
                  aria-label='LogOut'
                  title='LogOut'
                  className='rounded-full'
                >
                  <LogoutLink>
                    <LogOut />
                  </LogoutLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
