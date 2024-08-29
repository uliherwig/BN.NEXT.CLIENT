"use client";
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form"
import { basicPost, basicFetch } from '@/app/api/fetchFunctions';
import Cookies from 'js-cookie';



type LoginData = {
    username: string
    password: string
}



const Login = () => {

  const [accountData, setAccountData] = useState<any | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginData>({
        defaultValues: {
          username: '',
          password: ''
        }
      });


    const onSubmit: SubmitHandler<LoginData> = async (data) => {
       

        const res = await basicPost<any>(`/api/account/login`, data);

        Cookies.set('access-token', res.accessToken);
        Cookies.set('refresh-token', res.refreshToken);   }


  
    const testAccount = async () => {

        let accessToken = Cookies.get('access-token');

        console.log('accessToken:', accessToken);
      
        const res = await fetch('/api/account/login', {
          method: 'GET',
          headers: {            
            'Content-Type': 'application/json',
            'Set-Cookie': `access-token=${accessToken}; HttpOnly; Path=/; Max-Age=3600`,
            'Authorization': `Bearer ${accessToken}`,
          },
        });
    
        const result = await res.json();
        console.log(result);

        setAccountData(result);

    }
 



    return (
        <div className="h-full bg-white p-5">
            <div className="text-slate-800 text-lg font-bold mb-4">Sign in</div>
            <div className="flex flex-row gap-4 w-full">
                <div className="w-[50%]  border-r border-slate-400">

                    <div className="text-slate-800 text-lg mb-4">Sign in with Email or Username</div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        <label>Email or Username</label>
                        <input  {...register('username', { required: true })}  className='border border-slate-400 w-[250px] p-1' />
                        {errors.username && <span className='text-red-700'>This field is required</span>}
                        <label>Password</label>
                        <input type="password"  {...register('password', { required: true })} className='border border-slate-400 w-[250px] p-1' />
                        {errors.password && <span className='text-red-700'>This field is required</span>}

                        <input type="submit" value="Login" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' />
                    </form>
                </div>
                <div className="w-[50%]  border-r border-slate-400">
                <input type="button" value="Test API" className='border border-slate-400 w-[250px] mt-4 bg-slate-600 text-slate-50 p-1 cursor-pointer' onClick={testAccount} />
                <div>

                    {accountData  }
                </div>
          
                </div>
            </div> 
        </div>
    );
};

export default Login;