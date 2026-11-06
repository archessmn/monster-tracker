import { apiKey } from "@better-auth/api-key";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/env";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID!,
      clientSecret: env.BETTER_AUTH_GITHUB_SECRET!,
    },
  },
  plugins: [
    admin(),
    apiKey({
      rateLimit: {
        enabled: false,
      },
    }),
  ],
});
