"use client";

import { useState, useTransition } from "react";
import { updateUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type User = {
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

export default function UserAboutForm({
  user,
  open,
  setOpen,
}: {
  user: User;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    instrument: user.instrument || "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await updateUser(user.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          instrument: formData.instrument || null,
        });

        if (result) {
          setMessage("Profile updated successfully!");
          setTimeout(() => {
            setOpen(false);
            setMessage(null);
          }, 1000);
        } else {
          setMessage("Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setMessage("An error occurred while updating your profile.");
      }
    });
  };

  if (!user) {
    return (
      <div className='p-6 bg-background/70 rounded-xl w-4/5 mx-auto my-8'>
        <h2 className='text-2xl mb-2'>User not found</h2>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Edit Profile</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            Edit Profile Information
          </DialogTitle>
        </DialogHeader>
        {message && (
          <div
            aria-live='polite'
            className={`p-3 mb-4 rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium mb-1'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full p-2 border rounded-md'
                required
              />
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium mb-1'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='w-full p-2 border rounded-md'
                required
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-2 border rounded-md'
                required
              />
            </div>
            <div>
              <label
                htmlFor='instrument'
                className='block text-sm font-medium mb-1'
              >
                Instrument
              </label>
              <input
                type='text'
                id='instrument'
                name='instrument'
                value={formData.instrument}
                onChange={handleChange}
                className='w-full p-2 border rounded-md'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              disabled={isPending}
              aria-label='Save Changes'
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    instrument: user.instrument || "",
                  });
                  setMessage(null);
                }}
                aria-label='Cancel'
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
