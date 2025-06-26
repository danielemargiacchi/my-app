"use client";
import { useRouter } from "next/navigation"
import { authClient } from "../lib/auth-client";

export const SignOutButton = () => {
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await authClient.signOut({
            fetchOptions:{
                onError(context) {
                    console.log(context.error.message);
                    
                },
                onSuccess(){
                    router.push('/')
                }
            }
        })
    }

    return <button onClick={handleClick} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium hover:bg-red-300 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
}