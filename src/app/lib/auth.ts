

import NextAuth, { User } from "next-auth";
import { NextAuthOptions } from 'next-auth';
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";


const BnProvider = CredentialsProvider({
  name: "BnProvider",
  id: "bnprovider",
  type: "credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {

    const res = await fetch(`${process.env.IDENTITY_API_URL}/Account/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    var result = await res.json();
    if (res.ok && result) {
      console.log('authorize:', result);
    }

    const user: User = await result.jwtToken;

    if (user) {
      console.log('authorize:', user.name);
      return user;
    }
    return null;
  }
})

async function refreshAccessToken(token: any) {

  //console.log('refreshing token ====================================');
  try {
    const url = `${process.env.IDENTITY_API_URL}/Account/refresh-token`

    const params = {
      refreshToken: token.refreshToken,
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
    })



    if (!response.ok) {
      signOut()
    }
    const refreshedTokens = await response.json()
    token = {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken,
      expiresAt: Date.now() + refreshedTokens.expiresIn * 1000,
    }

    return token
  } catch (error) {
    //console.log('error refreshing token:', error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    BnProvider,
  ],

  session: {
    // jwt: true,
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      //console.log('CALLBACK  signIn:', user);
      if (user) {

        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      //console.log('CALLBACK  redirect:', url, baseUrl);
      return baseUrl
    },


    async jwt({ token, user }) {
      //console.log('CALLBACK  jwt:', user);
      //console.log('token:', token);
      if (user) {

        //console.log('user:', user);
        token.name = user.name;
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiresAt = Date.now() + (user.expiresIn ?? 0) * 1000;
        token.role = "Unknown" // the user role

        // handle expiry of token
        const expiresAt: number = token.expiresAt as number;

        if (Date.now() < expiresAt) {
          //console.log('CALLBACK  jwt:');
          //console.log(token);
          return token
        }

        return refreshAccessToken(token)
      }

      if (token) {

        //console.log('token:', token);


   



        // handle expiry of token
        const expiresAt: number = token.expiresAt as number;

        if (Date.now() < expiresAt) {
          //console.log('CALLBACK  jwt:');
          //console.log(token);
          return token
        }

        return refreshAccessToken(token)
      }



    },

    async session({ session, token, user }) {
      //console.log('CALLBACK  session:', session);
      //console.log('CALLBACK  session:', token);
      //console.log('CALLBACK  session:', user);



      if (token && session.user) {
        // session.user.id = token.id;
        // session.user.name = token.name;
        // session.user.email = token.email;
        // Attach user id to the session from the token
        // session.accessToken = token.accessToken
        // session.user.id = token.id;

        // Fetch additional user data from your .NET service
        // const res = await fetch(`http://localhost:5044/Account/login/${token.id}`);   // does not exist yet
        // const userData = await res.json();

        // // Attach additional user properties to the session
        // session.user = { ...session.user, ...userData };


      }
      return session;
    },
  },

  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    signOut: '/auth/signout',
    error: "/auth/error", // Error page

  },

  debug: process.env.NODE_ENV === "development",
};