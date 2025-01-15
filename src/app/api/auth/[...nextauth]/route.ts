import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Convierte la lista de correos en un array
const authorizedEmails = process.env.AUTHORIZED_EMAILS?.split(",") || [];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verifica si el correo está en la lista autorizada
      if (authorizedEmails.includes(user.email!)) {
        return true; // Permite el acceso
      }
      return false; // Deniega el acceso
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
