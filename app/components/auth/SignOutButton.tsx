"use client";
import { useRouter } from "next/navigation"
import { authClient } from "../../lib/auth-client";

export const SignOutButton = () => {
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await authClient.signOut({
            fetchOptions: {
                onError(context) {
                    console.log(context.error.message);

                },
                onSuccess() {
                    router.push('/')
                }
            }
        })
    }

    return <button onClick={handleClick} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium hover:bg-red-300 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <div className="hidden md:block">Sign Out</div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z"/></svg>
    </button>
}