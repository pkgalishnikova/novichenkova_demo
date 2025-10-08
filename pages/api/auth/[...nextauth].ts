import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedAdmins = ["polina.gal070904@gmail.com", "d.parshina28@gmail.com"];

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow allowed admins to log in
      return allowedAdmins.includes(user.email ?? "");
    },
    async session({ session }) {
      if (session.user) {
        if (allowedAdmins.includes(session.user.email ?? "")) {
          session.user.role = "admin";
        } else {
          session.user.role = "user";
        }
      }
      return session;
    },
  },
});
