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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

function getInitialFormData(user: User) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    instrument: user.instrument || "",
  };
}

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
  const [formData, setFormData] = useState(getInitialFormData(user));

  const { toast } = useToast();

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
          toast({
            variant: "default",
            title: "Success",
            description: "Profile updated successfully!",
          });
          setTimeout(() => {
            setOpen(false);
          }, 1000);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update profile.",
            action: (
              <ToastAction altText='Please try again'>
                Please try again
              </ToastAction>
            ),
          });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while updating your profile.",
          action: (
            <ToastAction altText='Please try again'>
              Please try again
            </ToastAction>
          ),
        });
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label
                htmlFor='firstName'
                className='block text-sm font-medium mb-1'
              >
                First Name
              </Label>
              <Input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='bg-foreground/50'
                required
              />
            </div>
            <div>
              <Label
                htmlFor='lastName'
                className='block text-sm font-medium mb-1'
              >
                Last Name
              </Label>
              <Input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='bg-foreground/50'
                required
              />
            </div>
            <div>
              <Label htmlFor='email' className='block text-sm font-medium mb-1'>
                Email
              </Label>
              <Input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='bg-foreground/50'
                required
              />
            </div>
            <div>
              <Label
                htmlFor='instrument'
                className='block text-sm font-medium mb-1'
              >
                Instrument
              </Label>
              <Input
                type='text'
                id='instrument'
                name='instrument'
                value={formData.instrument}
                onChange={handleChange}
                className='bg-foreground/50'
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
                  setFormData(getInitialFormData(user));
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
