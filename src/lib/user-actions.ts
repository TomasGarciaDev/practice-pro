import { db } from "@/db";
import { users } from "@/db/schema";
import { JwtPayload } from "jsonwebtoken";
import { eq } from "drizzle-orm";

/**
 * Creates a new user in the database from KindeAuth webhook data
 *
 * @param event The KindeAuth webhook event payload
 * @returns The created user or null if creation failed
 */
export async function createUser(event: JwtPayload) {
  try {
    // Extract user data from the event payload
    const userData = event.data.user;

    if (!userData) {
      console.error("No user data found in event payload");
      return null;
    }

    // Check if required fields are present
    if (
      !userData.id ||
      !userData.email ||
      !userData.first_name ||
      !userData.last_name
    ) {
      console.error("Missing required user data fields", userData);
      return null;
    }

    // Insert user into database
    const newUser = await db
      .insert(users)
      .values({
        kinde_id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        // Optional fields
        instrument: null, // This can be updated later by the user
      })
      .returning();

    console.log("User created successfully:", newUser[0]);
    return newUser[0];
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

/**
 * Checks if a user with the given Kinde ID exists in the database
 *
 * @param kindeId The Kinde ID to check
 * @returns True if the user exists, false otherwise
 */
export async function userExists(kindeId: string) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.kinde_id, kindeId))
      .limit(1);

    return existingUser.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}
