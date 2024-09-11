import * as React from 'react';
import "@/app/globals.css";
import SignInForm from '@/components/identity/signin-form';

export default function UserAccount() {

  return (
    <div className="flex bg-slate-100 text-slate-800 content-container w-[50%]">
      <nav className="w-[240px] p-5 border-r border-slate-500">
        <h1 className="text-xl  font-bold mb-4">User Account</h1>    
        Status: <span className="text-green-500">Active</span>
      </nav>
      <main className="h-full w-full content-container">
        <SignInForm />
      </main>
    </div>

  );
}