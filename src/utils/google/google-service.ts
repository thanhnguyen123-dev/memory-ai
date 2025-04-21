import { google } from "googleapis";
import { createClient } from "@/utils/supabase/server";

async function getOAuth2Client() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const accessToken = user?.user_metadata.provider_token;
  const refreshToken = user?.user_metadata.provider_refresh_token;

  if (!accessToken || !refreshToken) {
    throw new Error("Missing Google OAuth2 tokens");
  }
  
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oAuth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  }); 

  oAuth2Client.on("tokens", (tokens) => {
    const data: Record<string, string> = {};
    if (tokens.access_token) {
      data.provider_token = tokens.access_token;
    }
    if (tokens.refresh_token) {
      data.provider_refresh_token = tokens.refresh_token;
    }

    if (Object.keys(data).length > 0) {
      void supabase.auth.updateUser({ data });
    }
  });

  await oAuth2Client.getAccessToken();

  return oAuth2Client;
}

export async function getGmailClient() {
  const oAuth2Client = await getOAuth2Client();
  return google.gmail({ version: "v1", auth: oAuth2Client });
}

