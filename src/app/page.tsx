import { ListMusic } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className='flex flex-col lg:grid lg:grid-cols-2 lg:py-16'>
        {/* Left content */}
        <div className='my-auto'>
          <div className='flex flex-col gap-6 lg:p-12 p-8 text-center rounded-xl w-4/5 mx-auto my-8 bg-background/70'>
            <h1 className='text-5xl font-bold'>Welcome To Practice Pro</h1>
            <p className='text-3xl'>Your Best Music Practice Diary</p>
          </div>
        </div>

        {/* Right content (Login/Signup) */}
        <div className='my-auto flex flex-col justify-center items-center'>
          <div className='bg-background/70 w-4/5 h-full mx-auto rounded-xl flex flex-col items-center gap-6 text-4xl p-10'>
            <div className='flex justify-center items-center bg-background/70 rounded-full p-4'>
              <ListMusic className='w-24 h-24 text-foreground' />
            </div>

            <div className='flex flex-col w-full gap-6 items-center'>
              Login
              <Button asChild>
                <LoginLink>Sign In</LoginLink>
              </Button>
              <div className='border-b border-foreground w-full'></div>
              or Sign Up
              <Button asChild>
                <RegisterLink>Create Account</RegisterLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
