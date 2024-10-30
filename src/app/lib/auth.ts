

import { jwtDecode } from "jwt-decode";
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
      if (user) {
        return true
      }
      return false
    },

    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    async jwt({ token, user }) {
      if (user) {

        token.name = user.name;
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiresAt = Date.now() + (user.expiresIn ?? 0) * 1000;
        // token.role = "Unknown" // the user role is in token 

        const expiresAt: number = token.expiresAt as number;

        if (Date.now() < expiresAt) {
          return token
        }
        return refreshAccessToken(token)
      }

      if (token) {
        const expiresAt: number = token.expiresAt as number;
        if (Date.now() < expiresAt) {
          return token
        }
        return refreshAccessToken(token)
      }
    },

    async session({ session, token, user }) {

      const decoded: any = token.accessToken ? jwtDecode(token.accessToken) : null;

      if (token && session.user) {

        session.user.username = decoded.preferred_username;
        session.user.email = decoded.email;
        session.user.id = decoded.sub;    
        session.user.name = decoded.name;

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