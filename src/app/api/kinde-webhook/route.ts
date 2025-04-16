import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createUser, userExists } from "@/lib/user-actions";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const jwtDecoded = jwt.decode(token, { complete: true });
    if (!jwtDecoded) {
      return NextResponse.json({
        status: 500,
        statusText: "Error decoding jwt",
      });
    }
    const header = jwtDecoded.header;
    const kid = header.kid;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = jwt.verify(token, signingKey) as JwtPayload;

    // Handle various events
    switch (event.type) {
      case "user.created":
        // Check if user already exists
        const userData = event?.data?.user;
        if (!userData) {
          throw new Error("User data is missing in the event payload");
        }

        const isUserExists = await userExists(userData.id);
        console.log("User exists:", isUserExists);

        if (!isUserExists) {
          // Use the createUser function instead of duplicating the logic
          const newUser = await createUser(event);
          console.log("User created:", newUser);
        } else {
          console.log("User already exists, skipping creation");
        }
        break;
      default:
        console.log("Unhandled event type", event.type);
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 400,
        statusText: error.message,
      });
    }
  }

  return NextResponse.json({ status: 200, statusText: "success" });
}
