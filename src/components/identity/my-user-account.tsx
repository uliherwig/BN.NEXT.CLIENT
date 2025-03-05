'use client'

import { basicFetch } from "@/app/lib/fetchFunctions";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useDictionary } from "@/provider/dictionary-provider";
import CircularLoader from "../common/loader";
import SignInForm from "./signin-form";
import SignUpForm from "./signup-form";

const MyUserAccount = ({ searchParams, language }: { searchParams: URLSearchParams, language: string }) => {

  const dict = useDictionary();
  const [isLoading, setIsLoading] = useState(true);


  const { data: session, status } = useSession()
  const [header, setHeader] = useState<string | null>(null);

  let isRegister: boolean = false

  const queryStr = JSON.parse(JSON.stringify(searchParams));
  if (queryStr && queryStr.register) {
    isRegister = queryStr.register;
  }

  useEffect(() => {



    switch (status) {
      case 'loading':
        setHeader('');
        break;
      case 'authenticated':
        setHeader(`Willkommen ${session?.user?.name}`);
        setIsLoading(false);

        break;

      case 'unauthenticated':
        setHeader(`Willkommen`);
        setIsLoading(false);

        break;
    }



    if (session?.expires === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session, status]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    console.log('Sign in form submitted:', { username, password });

    const result = await signIn('bnprovider', {
      redirect: false,
      username,
      password,
    });

    console.log('Sign in result:', result);

    if (result?.error) {
      console.error('Error during sign in:', result.error);
      // Handle error
    } else {
      console.log('Sign in successful:', result);
    }
  };


  // const testAuth = async () => {
  //   setTestauth('');
  //   console.log('testing auth route');
  //   console.log('session:', session);
  //   const res = await basicFetch<any>(`/api/identity`);
  //   setTestauth(res.message);
  // }

  // registrieren
  // einloggen
  // ausloggen
  // account löschen

  return (

    <>


      <div className="h-full  p-5">


        {isLoading && (

          <CircularLoader />
        )}
        <div className="flex flex-row gap-4 w-full">

          {status === 'authenticated' && (
            <div>Löschen + Ausloggen</div>
          )}
          {!isRegister && status === 'unauthenticated' && (
            <>
 
              <div className="w-[50%]"><SignInForm language={language} /></div>
             <div className="w-[50%] pt-5">

                Bitte loggen Sie sich ein oder registrieren Sie sich, um fortzufahren.
              </div>
            </>

          )}
          {isRegister && status === 'unauthenticated' && (
            <>
 
              <div className="w-[50%]">
              Bitte loggen Sie sich ein oder registrieren Sie sich, um fortzufahren.
                <SignUpForm language={language} />
                </div>
             <div className="w-[50%] pt-5">

         
              </div>
            </>

          )}
          {/* <div className="w-[50%]  border-r border-slate-400">
            {status === 'authenticated' && (
              <div>
                <p>Signed in as {session?.user?.name}</p>
                <button onClick={() => signOut()} className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer'>Sign Out</button>
              </div>
            )}
            {status}

          </div> */}
        </div>

      </div>

    </>)

}

export default MyUserAccount;