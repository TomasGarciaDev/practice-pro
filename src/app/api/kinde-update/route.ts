import { NextRequest, NextResponse } from "next/server";

/**
 * Get Kinde API access token for management API
 */
async function getKindeApiToken() {
  const tokenEndpoint = `${process.env.KINDE_ISSUER_URL}/oauth2/token`;
  
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.KINDE_CLIENT_ID!,
      client_secret: process.env.KINDE_CLIENT_SECRET!,
      audience: `${process.env.KINDE_ISSUER_URL}/api`,
    }),
  });

  if (!response.ok) {
    console.error('Failed to get Kinde API token:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Update user information in Kinde
 */
async function updateKindeUser(kindeId: string, userData: { 
  given_name?: string; 
  family_name?: string; 
  email?: string 
}) {
  try {
    const token = await getKindeApiToken();
    if (!token) {
      console.error('Failed to get Kinde API token');
      return false;
    }

    const updateEndpoint = `${process.env.KINDE_ISSUER_URL}/api/v1/user`;
    
    const response = await fetch(updateEndpoint, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: kindeId,
        ...userData
      }),
    });

    if (!response.ok) {
      console.error('Failed to update user in Kinde:', await response.text());
      return false;
    }

    console.log('User updated in Kinde successfully');
    return true;
  } catch (error) {
    console.error('Error updating user in Kinde:', error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const body = await req.json();
    const { kindeId, userData } = body;

    if (!kindeId) {
      return NextResponse.json(
        { error: "Kinde ID is required" },
        { status: 400 }
      );
    }

    // Map our field names to Kinde field names
    const kindeUserData: {
      given_name?: string;
      family_name?: string;
      email?: string;
    } = {};

    if (userData.firstName) kindeUserData.given_name = userData.firstName;
    if (userData.lastName) kindeUserData.family_name = userData.lastName;
    if (userData.email) kindeUserData.email = userData.email;

    // Update user in Kinde
    const success = await updateKindeUser(kindeId, kindeUserData);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to update user in Kinde" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in Kinde update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}