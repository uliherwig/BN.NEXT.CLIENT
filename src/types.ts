// types.ts
import { JWT } from 'next-auth/jwt';
import { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

declare module 'next-auth' {
    interface User  {
      id?: string;
      role?: string;
      name: string;
      email: string;
      accessToken?: string;
      refreshToken?: string;
      expiresIn?: number;
    }
  }

  // declare module 'next-auth' {
  //   interface Session {
  //     id?: string;
  //     role?: string;
  //     accessToken?: string;
  //     refreshToken?: string;
  //     expiresIn?: number;
  //   }
  // }