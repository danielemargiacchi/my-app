import { headers } from "next/headers"
import { auth } from "../lib/auth"
import { SignOutButon } from "../components/SignOutButton";

const Page = async () => {
    const session = await auth.api.getSession({headers: await headers()});

    if (!session) {
        return <p>Unauthorized</p>
    }
    return <>
    <h1>Profile</h1>
    <SignOutButon/>
    </>
}

export default Page;