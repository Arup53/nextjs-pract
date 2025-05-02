import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365 * 2,
  },
  pages: {
    signIn: "/auth/login", // 👈 Custom login page
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && profile) {
        const backendRes = await fetch("http://localhost:3001/auth/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
          }),
        });

        const userData = await backendRes.json();

        // 🔐 SIGN a JWT here
        const signedToken = jwt.sign(
          { id: userData.id, email: userData.email },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "2y" }
        );

        token.accessToken = signedToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // 🔑 pass the real JWT here
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
