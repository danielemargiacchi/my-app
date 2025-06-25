"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Form = ({ type }: { type: 'signIn' | 'signUp' }) => {
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const name = '';
        const password = String(formData.get('password'));
        const username = String(formData.get('username')) ;
        const email = `${username}@example.com` ;
        authClient.signUp.email({
            name,
            email,
            password,
            username
        },{
            onRequest: () => {
                setIsPending(true)
            },
            onResponse:() => {
                setIsPending(false)
            },
            onError: (context) => {
                console.log(context.error.message);
            },
            onSuccess:() => {
                router.push('/')
            }
        })
    }
    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const password = String(formData.get('password'));
        const username = String(formData.get('username')) ;

        authClient.signIn.username({
            username,
            password
        },{
            onRequest: () => {
                setIsPending(true)
            },
            onResponse:() => {
                setIsPending(false)
            },
            onError: (context) => {
                console.log(context.error.message);
            },
            onSuccess:() => {
                router.push('/dashboard')
            }
        })
    }




    return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{type === 'signUp' ? 'Sign up' : 'Log in'}</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={type === 'signUp' ? signUp : signIn}>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">username</label>
                    </div>
                    <div className="mt-2">
                        <input type="text" name="username" id="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input type="password" name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                {type === 'signUp' && (
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password-repeat" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input type="password" name="password-repeat" id="password-repeat" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                )}

                <div>
                    <button disabled={isPending} type="submit" className=" disabled:bg-indigo-300 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                 {type === 'signIn' ? 'Have not an account yet? ' : 'Already have an account? '}
                <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href={type === 'signIn' ? '/signup' : '/'} >{type === 'signIn' ? 'Sign up' : 'Log in'}</Link>
            </p>
        </div>
    </div>
}