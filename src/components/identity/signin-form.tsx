'use client'

import { basicFetch } from "@/app/lib/fetchFunctions";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState , useEffect } from 'react';
import { getToken } from "next-auth/jwt"




const SignInForm = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false);
  const [testauth, setTestauth] = useState('');

  useEffect(() => {
    if (session?.expires === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);


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
      // Handle successful sign in
    }
  };
  const testAuth = async () => {
    setTestauth('');
    console.log('testing auth route');
    console.log('session:', session);
    const res = await basicFetch<any>(`/api/identity`);

    console.log('res:', res);
    setTestauth(res.message);
  }

  return (

    <>

      <div className="h-full bg-white p-5">
        <div className="text-slate-800 text-lg font-bold mb-4">Sign in</div>
        {isClient  && (
          
        
        <div className="flex flex-row gap-4 w-full">
          <div className="w-[50%]  border-r border-slate-400">

            <div className="text-slate-800 text-lg mb-4">Sign in with Email or Username</div>

            <form onSubmit={handleSubmit}>
              <label>Email or Username</label>
              <input type="text" className='border border-slate-400 w-[250px] p-1' name="username" required   />


              <label>Password</label>
              <input className='border border-slate-400 w-[250px] p-1'
                type="password"
                name="password"

                required
              />



              <button disabled={loading} type="submit" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer'>
                Sign In
              </button>


            </form>
            <div>
              Sie haben noch kein Konto? <a href="/auth/signup" className='text-blue-500'>Registrieren</a>
            </div>
                     </div>
          <div className="w-[50%]  border-r border-slate-400">
            {status === 'authenticated' && (
              <div>
                <p>Signed in as {session?.user?.name}</p>
                <button onClick={() => signOut()} className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer'>Sign Out</button>
              </div>
            )}
           {status}
            <div>
              <button onClick={testAuth} className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer'>Test Auth Route</button>
              <div> {testauth}</div>
            </div>
          </div>
        </div>
        )}
      </div>

    </>)

}

export default SignInForm;