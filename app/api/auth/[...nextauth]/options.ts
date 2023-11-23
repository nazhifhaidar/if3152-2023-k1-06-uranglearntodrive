import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secret = process.env.NEXTAUTH_SECRET
const url = process.env.NEXTAUTH_URL

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            id: 'credentials',
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: {},
              password: {}
            },
            async authorize(credentials, req) {
              const res = await fetch(`${url}/api/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })

              const response = await res.json();
              console.log(response?response:"none");
              if (res.ok && response) {
                const {data}= response;
                const user = data;
                return user;
              }
              // Return null if user data could not be retrieved
              throw new Error(response.message);
            }
          })
    ],  
    callbacks: {
      async signIn({user, credentials}){
        // console.log("signIn callbacks", {user, credentials});
        return true; // Continue with the default behavior if the role is not admin or owner
      },
      async session({session, token}){
        // console.log("session callback", {session, token});
        if (session?.user) session.user.role = token.role
          return session;
      },
      async jwt({token, user}){
        // console.log("jwt callback", {token, user});
        if (user) token.role = user.role
          return token;
      },
      
      
    },
    secret: secret,
    session: {
      strategy:"jwt",
      maxAge: 3*60*60
    },
    pages:{
      signIn:"/login"
}
    
}