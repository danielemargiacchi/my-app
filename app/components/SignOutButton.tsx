"use client";
import { useRouter } from "next/navigation"
import { authClient } from "../lib/auth-client";

export const SignOutButon = () => {
    const router = useRouter();

    const handleClick = async () => {
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

    return <button className="bg-red-500 p-2 rounded-md" onClick={handleClick}>Sign out</button>
}