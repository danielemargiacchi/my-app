"use server";


import { redirect } from "next/navigation";
import { auth } from "./auth"; // path to your Better Auth server instance

export const signUp = async (formData: FormData) => {
    const authBody = {
        name: String(formData.get('name')),
        email: String(formData.get('email')),
        password: String(formData.get('password'))
    }
    try {
        const response = await auth.api.signUpEmail({
            body: authBody,
            asResponse: true,
        });

        const json = await response.json();

        if (!response.ok) {
            console.error("SignUp Error:", json);
            return; // oppure `return json.error` se vuoi passarlo alla UI
        }


    } catch (error) {
        console.error("SignUp request failed:", error);
    }

        redirect("/");


}
export const signIn = async (formData: FormData) => {
    const authBody = {
        email: String(formData.get('email')),
        password: String(formData.get('password'))
    }

     try {
        const response = await auth.api.signInEmail({
            body: authBody,
            asResponse: true,
        });

        const json = await response.json();
        console.log(response);
        
        if (!response.ok) {
            console.error("SignUp Error:", json);
            return; // oppure `return json.error` se vuoi passarlo alla UI
        }


    } catch (error) {
        console.error("SignUp request failed:", error);
    }

        redirect("/dashboard");

}
