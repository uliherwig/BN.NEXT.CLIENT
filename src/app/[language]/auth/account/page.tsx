import * as React from 'react';
import "@/app/globals.css";
import SignUpForm from '@/components/identity/signup-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export default async function UserAccount() {

  const session = await getServerSession(authOptions)

  return (
    <div className="flex bg-slate-100 text-slate-800 content-container w-[50%]">
      <nav className="w-[240px] p-5 border-r border-slate-500">
        <h1 className="text-xl  font-bold mb-4">User Account</h1>    
        Status: <span className="text-green-500">{session?.user?.name}</span>
      </nav>
      <main className="h-full w-full content-container">

        {session == null &&  <SignUpForm /> }

        {session && <div>Logged in as {session?.user?.name}</div>}
       
      </main>
    </div>

  );
}