'use client'; //to make it frontend because everything is on server in NextJs

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; //To forcefully send the user to profile page
import axios from "axios";
import {toast} from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState( {
        email: "",
        password: ""
    } )

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    // Always use async in method because it talks to the database
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login successful", response.data);
            //send the user to Profile Page
            router.push("/profile")

        } catch (error: any) {
            console.log("Login failed", error.message);
           toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            
            <h1 className=" text-2xl mb-5">{loading ? "Processing" : "Login" }</h1>
            <hr />
            <div className="flex justify-between h-100 flex-col">
                <div className="m-3">
                <label htmlFor="email" className="m-3">Email</label>
                <input className=" p-2 rounded-lg text-black" 
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={ (e) => setUser( {...user, email: e.target.value}) }
                    placeholder="email"
                />
                </div>
                <div>
                <label htmlFor="password" className="m-3">Password</label>
                <input className=" p-2 rounded-lg text-black" 
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={ (e) => setUser( {...user, password: e.target.value}) }
                    placeholder="password"
                />
                </div>
            </div>
            <button 
            onClick={onLogin}
            className="px-6 py-2 m-3 rounded-lg bg-slate-600">{buttonDisabled ? "No Login" : "Login"}</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}