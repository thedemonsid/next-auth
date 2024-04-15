import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      profile(profile) {
        console.log("Profile :\n", profile);
        let userRole = "Github User";
        if (profile.email == "siddheshshrirame@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GithubId,
      clientSecret: process.env.GithubSecret,
    }),

    GoogleProvider({
      profile(profile) {
        console.log("Profile\n".profile);
        return {
          ...profile,
          id: profile.sub,
        };
      },
      clientId: process.env.GoogleId,
      clientSecret: process.env.GoogleSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.role = token.role;
      return session;
    },
  },
};
