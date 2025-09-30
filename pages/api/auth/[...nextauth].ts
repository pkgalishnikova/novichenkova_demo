import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow the owner’s email to log in
      const allowedAdmins = ["polina.gal070904@gmail.com"];
      if (allowedAdmins.includes(user.email ?? "")) {
        return true;
      }
      return false;
    },
    async session({ session }) {
        if (session.user) {
            if (session.user.email === "polina.gal070904@gmail.com") {
                session.user.role = "admin";
            } else {
                session.user.role = "user";
            }
        }
        return session;
    }
  },
});
