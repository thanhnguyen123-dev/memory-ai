import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createClient } from "@/utils/supabase/server";
import { google } from "googleapis";


export const gmailRouter = createTRPCRouter({
  getThreads: protectedProcedure.query(async ({ ctx }) => {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oAuth2Client.setCredentials({
      access_token: session?.provider_token,
      refresh_token: session?.provider_refresh_token,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const res = await gmail.users.threads.list({ userId: "me", maxResults: 10 });
    const data = res.data;

    const threads = data.threads;
    return threads;
  }),
});
