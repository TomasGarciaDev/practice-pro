import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    switch (event?.type) {
      case "user.created":
        // create user in database
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
