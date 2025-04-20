import { google } from "googleapis";
import { createClient } from "@/utils/supabase/server";

async function getOAuth2Client() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.provider_token || !session?.provider_refresh_token) {
    throw new Error("Missing Google OAuth2 tokens");
  }
  
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oAuth2Client.setCredentials({
    access_token: session?.provider_token,
    refresh_token: session?.provider_refresh_token,
  }); 

  return oAuth2Client;
}

export async function getGmailClient() {
  const oAuth2Client = await getOAuth2Client();
  return google.gmail({ version: "v1", auth: oAuth2Client });
}

