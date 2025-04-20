import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getGmailClient } from "@/utils/google/google-service";


export const gmailRouter = createTRPCRouter({
  // Get all threads
  getThreads: protectedProcedure.query(async ({ ctx }) => {
    const gmail = await getGmailClient();
    const res = await gmail.users.threads.list({ userId: "me", maxResults: 10 });
    const data = res.data;
    const threads = data.threads;
    return threads;
  }),
});
