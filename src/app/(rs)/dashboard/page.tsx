import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUser } from "@/lib/queries/getUser";
import UserCard from "./UserCard";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};

const editUser = async () => {
  console.log("Edit User Function Called");
};

export default async function Dashboard() {
  const { getUser: getKindUser } = getKindeServerSession();
  const { id: userKindId } = await getKindUser();
  const user = await getUser(userKindId);

  return (
    <div className='p-6 bg-background/80 rounded-xl w-4/5 mx-auto my-8'>
      <UserCard user={user} />
    </div>
  );
}
