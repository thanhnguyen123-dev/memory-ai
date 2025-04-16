import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const basicRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return "Hello World";
  }),
});