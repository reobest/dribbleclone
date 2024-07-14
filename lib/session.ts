import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
      session:{
        strategy : 'jwt',
        maxAge : 1 * 24 * 60 * 60,
      },
      jwt : {

      },
      callbacks : {
        
      },
      secret: process.env.NEXTAUTH_SECRET

}