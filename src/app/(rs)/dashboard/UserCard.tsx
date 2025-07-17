"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import UserAboutForm from "./form/userAboutForm";
import { useState } from "react";

export type User = {
  id: number;
  kinde_id: string;
  firstName: string;
  lastName: string;
  email: string;
  instrument: string | null;
  achievedGoals: number | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function UserCard({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='flex justify-between items-end mb-6 text-2xl'>
        <h2 className='text-2xl font-semibold'>Profile Information</h2>

        <div>
          <p className='font-medium text-foreground/70'>
            Goals Achieved: {user.achievedGoals}
          </p>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm font-medium text-foreground/80'>First Name</p>
            <p className='text-lg font-semibold'>{user.firstName}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-foreground/80'>Last Name</p>
            <p className='text-lg font-semibold'>{user.lastName}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-foreground/80'>Email</p>
            <p className='text-lg font-semibold'>{user.email}</p>
          </div>
          <div>
            <p className='text-sm font-medium text-foreground/80'>Instrument</p>
            <p className='text-lg font-semibold'>
              {user.instrument || (
                <Button onClick={() => setOpen(true)} size='sm'>
                  Add Instrument
                </Button>
              )}
            </p>
          </div>
        </div>
        <UserAboutForm user={user} open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
