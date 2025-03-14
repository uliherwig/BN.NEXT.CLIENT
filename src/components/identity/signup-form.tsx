'use client'

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/app/actions/auth";
import BnButton from "../common/buttons/bn-button";
import { useDictionary } from '@/provider/dictionary-provider';

const errorMessageClass = 'text-red-500 text-sm';

function firstOrDefault<T>(array: T[], defaultValue: T): T {
  if (!array) {
    return defaultValue;
  }
  return array.length > 0 ? array[0] : defaultValue;
}

const SignUpForm = ({ language }: { language: string }) => {

  const [state, formAction] = useFormState<any, FormData>(register, { message: '', success: false, errors: {} });

  const dictionary = useDictionary();
  if (!dictionary) {
    return <div>Loading...</div>;
  }

  return (

    <>
      <div className="h-full p-5">
        <div className="flex flex-row gap-4 w-full justify-center">
          <div className="w-full pr-5">
            <div className="text-slate-800 text-lg font-bold mb-4">{dictionary.AUTH_register}</div>
            {state.success && (
              <div className="text-green-500">Success! You have signed up successfully. Please check your email for a confirmation link.</div>
            )}

            {!state.success && (
              <form action={formAction} className='flex flex-col gap-2'>
                <div>
                  <label>Username</label>
                  <input type="text" className="border border-slate-400 w-full p-1" name="username" />
                  <div className={errorMessageClass}>{firstOrDefault(state?.errors?.username, '')}</div>
                </div>
                <div>
                  <label>Email</label>
                  <input type="text" className="border border-slate-400 w-full p-1" name="email" />
                  <div className={errorMessageClass}>{firstOrDefault(state?.errors?.email, '')}</div>
                </div>
                <div>
                  <label>First Name</label>
                  <input type="text" className="border border-slate-400 w-full p-1" name="firstName" />
                  <div className={errorMessageClass}>{firstOrDefault(state?.errors?.firstName, '')}</div>
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" className="border border-slate-400 w-full p-1" name="lastName" />
                  <div className={errorMessageClass}>{firstOrDefault(state?.errors?.lastName, '')}</div>
                </div>

                <div>
                  <label>Password</label>
                  <input
                    className="border border-slate-400 w-full p-1"
                    type="password"
                    name="password" />
                  <div className={errorMessageClass}>{firstOrDefault(state?.errors?.password, '')}</div></div>
                <div><label>Re-enter Password</label>
                  <input
                    className="border border-slate-400 w-full p-1"
                    type="password"
                    name="passwordReEnter" />
                  <div className={errorMessageClass}>{state?.errors?.passwordReEnter}</div></div>
                <div>

                  {state.errorMessage &&
                    <div className={errorMessageClass}>Fehler: <span className={errorMessageClass}> {state.errorMessage}</span></div>}


                  <BnButton type="submit" label="Sign Up" />
                </div>
              </form>
            )}
            <div>
              <a href={`/${language}/auth/account`} className='text-blue-500'>{dictionary.AUTH_login}</a>
            </div>
          </div>
        </div>
      </div>
    </>)

}

export default SignUpForm;