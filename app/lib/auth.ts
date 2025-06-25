import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { username } from "better-auth/plugins";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    plugins: [ 
        username() 
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled:true,
        minPasswordLength: 1,
        autoSignIn: false
    },
});