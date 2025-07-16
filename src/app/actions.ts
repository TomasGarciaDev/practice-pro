"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Updates a user's information in the database and in Kinde
 *
 * @param userId The database ID of the user to update
 * @param userData The user data to update
 * @returns The updated user or null if update failed
 */
export async function updateUser(
  userId: number,
  userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    instrument?: string | null;
  }
) {
  try {
    // Get the user to get the Kinde ID
    const userQuery = await db.select().from(users).where(eq(users.id, userId));

    if (userQuery.length === 0) {
      console.error("No user found with ID:", userId);
      return null;
    }

    const user = userQuery[0];

    // Update user in our database
    const updatedUser = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    // Update user in Kinde if name or email is being updated
    if (userData.firstName || userData.lastName || userData.email) {
      try {
        // Call the Kinde update API
        const response = await fetch("/api/kinde-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kindeId: user.kinde_id,
            userData: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
            },
          }),
        });

        if (!response.ok) {
          console.error(
            "Failed to update user in Kinde:",
            await response.text()
          );
        }
      } catch (error) {
        console.error("Error calling Kinde update API:", error);
      }
    }

    // Revalidate the dashboard page to reflect the changes
    revalidatePath("/dashboard");

    console.log("User updated successfully:", updatedUser[0]);
    return updatedUser[0];
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}
