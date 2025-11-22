import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { customSession, twoFactor } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import sendEmail from "./email";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "sqlite", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click the link to reset your password: ${url}</p>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click the link to verify your email: ${url}</p>`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  //   Adding Hooks for the Authentication Process
  //   hooks: {
  //     before: createAuthMiddleware(async (ctx) => {}),
  //     after: createAuthMiddleware(async (ctx) => {}),
  //   },

  // Setting up plugins
  plugins: [
    nextCookies(),
    // twoFactor({
    //   issuer: "Boilerplate",
    //   skipVerificationOnEnable: true,
    //   otpOptions: {
    //     period: 180,
    //     async sendOTP({ user, otp }) {
    //       sendEmail({
    //         to: user.email,
    //         subject: "Two-factor authentication code",
    //         html: `<p>Your two-factor authentication code is: ${otp}</p>`,
    //       });
    //     },
    //   },
    //   backupCodeOptions: {
    //     amount: 1,
    //   },
    // }),

    // Setting up custom session middleware
    // customSession(async ({ user, session }) => {
    //   return {
    //     session,
    //     user,
    //   };
    // }),
  ],
});
