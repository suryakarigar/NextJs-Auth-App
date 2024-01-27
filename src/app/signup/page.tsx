"use client"; //to make it frontend because everything is on server in NextJs

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();
    const [user, setUser] = useState( {
        username: "",
        email: "",
        password: ""
    } )

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    // Always use async in method because it talks to the database
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup successful", response.data);
            // send the user to login page
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed lanka lag gayi", error.message);          
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            
            <h1 className=" text-2xl mb-5">{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <div className="flex justify-between h-100 flex-col">
                <div className="m3">
                <label htmlFor="username" className="m-3">Username</label>
                <input className=" p-2 rounded-lg text-black" 
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={ (e) => setUser( {...user, username: e.target.value}) }
                    placeholder="username"
                />
                </div>
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
            onClick={onSignup}
            className="px-6 py-2 m-3 rounded-lg bg-slate-600">{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}