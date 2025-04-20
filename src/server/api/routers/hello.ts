import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
});