import { db } from "@/db";
import { practiceRoutines } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPracticeRoutine(userId: number) {
  const practiceRoutine = await db
    .select()
    .from(practiceRoutines)
    .where(eq(practiceRoutines.userId, userId));

  return practiceRoutine[0];
}
