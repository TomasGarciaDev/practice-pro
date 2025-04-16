import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(kindeId: string) {
  const user = await db.select().from(users).where(eq(users.kinde_id, kindeId));

  return user[0];
}
