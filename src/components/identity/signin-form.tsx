'use client'

import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useDictionary } from "@/provider/dictionary-provider";
import BnButton from "../common/buttons/bn-button";

const SignInForm = ({ language }: { language: string }) => {


  const [loginError, setLoginError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;


    const result = await signIn('bnprovider', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setLoginError('Login failed. Invalid credentials');
    } 
  };
  const dictionary = useDictionary();
  if (!dictionary) {
    return <div>Loading...</div>;
  }


  return (

    <>

      <div className="h-full p-5">
        <div className="text-slate-800 text-lg font-bold mb-4">Sign in</div>

        <form onSubmit={handleSubmit} className='my-2'>
          <div className='flex flex-col'>
            <label>Username</label>
            <input type="text" className='border border-slate-400 w-full p-1' name="username" required onFocus={() => setLoginError('')} />
            <label>{dictionary.AUTH_password}</label>
            <input className='border border-slate-400 w-full p-1'
              type="password"
              name="password"
              required />
            <BnButton type='submit' label={dictionary.AUTH_login} />
          </div>
        </form>

        <div className='text-red-800'>
          {loginError}
        </div>
        <div>
          {dictionary.AUTH_noaccount} <a href={`/${language}/auth/account?register=true`} className='text-blue-500'>{dictionary.AUTH_register}</a>
        </div>

      </div>

    </>)

}

export default SignInForm;