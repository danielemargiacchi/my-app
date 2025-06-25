"use client";

import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

export const Form = ({ type }: { type: 'signIn' | 'signUp' }) => {

    const router = useRouter();

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement)
        const name = String(formData.get('name'));
        const password = String(formData.get('password'));
        const email = String(formData.get('email')) ;

        console.log(name, email, password);
        authClient.signUp.email({
            name,
            email,
            password
        },{
            onRequest: () => {},
            onResponse:() => {},
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
        const email = String(formData.get('email')) ;

        authClient.signIn.email({
            email,
            password
        },{
            onRequest: () => {},
            onResponse:() => {},
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
                {type === 'signUp' && (
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                        <div className="mt-2">
                            <input type="name" name="name" id="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
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
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                 {type === 'signIn' ? 'Have not an account yet? ' : 'Already have an account? '}
                <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href={type === 'signIn' ? '/signup' : '/'} >{type === 'signIn' ? 'Sign up' : 'Log in'}</Link>
            </p>
        </div>
    </div>
}