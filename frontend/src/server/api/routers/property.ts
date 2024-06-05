import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const propertyRouter = createTRPCRouter({
    create:publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input, ctx }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),
});
