'use client';

import { basicFetch, basicPost } from "@/app/lib/fetchFunctions";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useDictionary } from "@/provider/dictionary-provider";
import CircularLoader from "../common/loader";
import SignInForm from "./signin-form";
import SignUpForm from "./signup-form";
import { UserAccount } from "@/models/identity/user-account";
import { format } from 'date-fns';
import WidgetButton from "../common/buttons/widget-button";
import DeleteAccountModal from "./delete-account-modal";
import router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "next/dist/server/api-utils";
import BNButton from "../common/buttons/bn-button";

const MyUserAccount = ({ searchParams, language }: { searchParams: URLSearchParams, language: string }) => {
  const dictionary = useDictionary();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserAccount | null>(null);

  const { data: session, status } = useSession();
  const [header, setHeader] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = () => {
    setDialogOpen(false);
  };


  let isRegister, isRedirect: boolean = false;

  const queryStr = JSON.parse(JSON.stringify(searchParams));
  if (queryStr && queryStr.register) {
    isRegister = queryStr.register;
  }
  if (queryStr && queryStr.redirect) {
    isRedirect = queryStr.redirect;
  }

  const handleSignOut = async () => {

    const result = await basicPost('/api/identity/signout', {});
    const options = {
      callbackUrl: '/auth/account',
      redirect: false,
    };
    await signOut(options);

  };

  const sendTestMail = async () => {
    const endpoint = `/api/identity/send-mail`;
    const res = await fetch(endpoint, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
    if (res.ok) {
      toast.success('Testmail sent');
    }
    else {
      toast.error('Error sending testmail');
    } 
  }


  useEffect(() => {
    switch (status) {

      case 'authenticated':
        setHeader(`${dictionary?.AUTH_welcome} ${session?.user?.name}`);
        const fetchUserAccount = async () => {
          const endpoint = `/api/identity/user-account`;

          var response = await fetch(endpoint);
          console.log('response:', response);
          if (response.ok) {
            var userAccount = await response.json();
            setUser(userAccount);
          } else {
            toast.error('Error fetching user account');
            await handleSignOut();

          }
        };

        fetchUserAccount();
        setIsLoading(false);
        break;
      case 'unauthenticated':
        setIsLoading(false);
        break;
    }


  }, [session, status, dictionary]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const username = formData.get('username') as string;
  //   const password = formData.get('password') as string;

  //   console.log('Sign in form submitted:', { username, password });

  //   const result = await signIn('bnprovider', {
  //     redirect: false,
  //     username,
  //     password,
  //   });

  //   console.log('Sign in result:', result);

  //   if (result?.error) {
  //     console.error('Error during sign in:', result.error);
  //     // Handle error
  //   } else {
  //     console.log('Sign in successful:', result);
  //   }
  // };

  if (!dictionary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <ToastContainer position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        theme="colored" />
      {isLoading ? (
        <div className="p-10"><CircularLoader /></div>
      ) : (
        <div className="flex flex-row gap-4 w-full">
          {status === 'authenticated' && (
            <div>
              <h3>{header}</h3>
              <div className="grid grid-cols-2 gap-2 my-4">

                <div>UserName:</div>
                <div className='font-bold'>{user?.username}</div>

                <div>Email:</div>
                <div>{user?.email}</div>

                <div>First Name:</div>
                <div>{user?.firstName}</div>

                <div>Last Name:</div>
                <div>{user?.lastName}</div>

                <div>Created At:</div>
                <div> {user?.createdAt ? format(user.createdAt, 'dd.MM.yy HH:mm') : ''}</div>
              </div>

              <WidgetButton type='button' label={dictionary.AUTH_logout} method={handleSignOut} />

              <div className="mt-4 font-light">
                Klicken Sie <a className="font-normal underline text-red-800" href="#" onClick={() => setDialogOpen(true)}>hier</a> um Ihr Benutzerkonto inklusive aller damit verbundenen Daten zu löschen.
              </div>

              <DeleteAccountModal isOpen={dialogOpen} closeDialog={closeDialog} />
            </div>

          )}

          {!isRegister && status === 'unauthenticated' && (
            <>
              <div className="w-[50%]">
                {dictionary.AUTH_subhead}
                <SignInForm language={language} />
              </div>
              <div className="w-[50%] pt-5"></div>
            </>
          )}
          {isRegister && status === 'unauthenticated' && (
            <>
              <div className="w-[50%]">
                Bitte loggen Sie sich ein oder registrieren Sie sich, um fortzufahren.
                <SignUpForm language={language} />
              </div>
              <div className="w-[50%] pt-5"></div>
            </>
          )}
        </div>
      )}
        <WidgetButton type='button' label="Send Test Mail" method={sendTestMail} />


    </div>
  );
}

export default MyUserAccount;