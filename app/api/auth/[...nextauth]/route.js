import { compare } from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connection from "@/app/lib/db"

// Fungsi untuk cari user dari database pakai email
async function getUserByEmail(email) {
  const [rows] = await connection.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  )

  return rows.length ? rows[0] : null
}



export const authOptions = {
  pages: {
    signIn: "/login", // kalau belum login, diarahkan ke /login
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        // 1. Ambil email dan password dari input
        const email = credentials.email
        const password = credentials.password

        if (!email || !password) return null

        // 2. Cek user di database
        const user = await getUserByEmail(email)
        if (!user) return null

        // 3. Cek password (cocok atau tidak)
        const isValid = await compare(password, user.password)
        if (!isValid) return null

        // 4. Return data user ke session/JWT
        return {
          id: user.id,
          email: user.email,
          name: user.username,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
}



const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
