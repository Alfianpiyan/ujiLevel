import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "@/app/lib/db";

async function getUserByEmail(email) {
  const conn = await connection(); // 🔹 HARUS AWAIT
  const [rows] = await conn.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  await conn.end();
  return rows.length ? rows[0] : null;
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.nama };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
