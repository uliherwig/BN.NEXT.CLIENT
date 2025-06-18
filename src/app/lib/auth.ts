
import { jwtDecode } from "jwt-decode";
import NextAuth, { User } from "next-auth";
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

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
    const user: User = await result.jwtToken;

    if (user) {
      return user;
    }

    return null;
  }
})

async function refreshAccessToken(token: any) {

  // console.log('refreshing token ====================================');
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


    const refreshedTokens = await response.json()

    // console.log('refreshedTokens:', refreshedTokens);

    // console.log('refreshedTokens.statusCode:', response, response.status);

    token = {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken,
      expiresAt: Date.now() + refreshedTokens.expiresIn * 1000,
    }

    // console.log('refreshed token:', token);

    if (response.status !== 200) {

      token = {
        ...token,
        accessToken: undefined,
        refreshToken: undefined,
        expiresAt: 0,
        error: "RefreshAccessTokenError",
      }

    }
    return token

  } catch (error) {
    // console.log('error refreshing token:', error);
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

      // // console.log('signIn:', user);
      // // console.log('signIn:', account);
      // // console.log('signIn:', profile);  
      // // console.log('signIn:', email);
      // // console.log('signIn:', credentials);

      if (user) {
        return true
      }
      return false
    },

    async redirect({ url, baseUrl }) {
      // console.log('redirect url:', baseUrl)
      return baseUrl
    },

    async jwt({ token, user }) {
      if (user) {
        // console.log('jwt user:', user);
        // console.log('token:', token);

        token.name = user.name;
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.expiresAt = Date.now() + (user.expiresIn ?? 0) * 1000;
        // token.role = "Unknown" // the user role is in token 

        const expiresAt: number = token.expiresAt as number;
        // console.log('jwt token expires at:', expiresAt);

        if (Date.now() < expiresAt) {
          return token
        }
        token = await refreshAccessToken(token)
        return token
      }

      if (token) {
        const expiresAt: number = token.expiresAt as number;
        if (Date.now() < expiresAt) {
          return token
        }
        token = await refreshAccessToken(token)
        return token
      }
    },

    async session({ session, token, user }) {

      const decoded: any = token.accessToken ? jwtDecode(token.accessToken) : null;
      // console.log('session decoded:', decoded);

      if (token.accessToken && session.user) {

        session.user.username = decoded.preferred_username;
        session.user.email = decoded.email;
        session.user.id = decoded.sub;
        session.user.name = decoded.name;
        // session.user.role = decoded.role;
        session.accessToken = token.accessToken;

        // Fetch additional user data from your .NET service
        // const res = await fetch(`http://localhost:5044/Account/login/${token.id}`);   // does not exist yet
        // const userData = await res.json();

        // // Attach additional user properties to the session
        // session.user = { ...session.user, ...userData };

      }
      return session;
    },
  },



  debug: process.env.NODE_ENV === "development",
};