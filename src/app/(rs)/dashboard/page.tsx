import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUser } from "@/lib/queries/getUser";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};

export default async function Dashboard() {
  const { getUser: getKindUser } = getKindeServerSession();
  const { id: userKindId } = await getKindUser();
  const user = await getUser(userKindId);

  return (
    <div className='p-6 bg-background/80 rounded-xl w-4/5 mx-auto my-8'>
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
              {user.instrument || "Not specified"}
            </p>
          </div>
        </div>
        <div className='flex justify-end '>
          <Button>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}
