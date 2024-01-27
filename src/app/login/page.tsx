'use client'; //to make it frontend because everything is on server in NextJs

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; //To forcefully send the user to profile page
import axios from "axios";




export default function LoginPage() {

    const [user, setUser] = useState( {
        email: "",
        password: ""
    } )

    // Always use async in method because it talks to the database
    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            
            <h1 className=" text-2xl mb-5">Log in</h1>
            <hr />
            <div className="flex justify-between h-100 flex-col">
                <div className="m-3">
                <label htmlFor="email" className="m-3">Email</label>
                <input className=" p-2 rounded-lg" 
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={ (e) => setUser( {...user, email: e.target.value}) }
                    placeholder="email"
                />
                </div>
                <div>
                <label htmlFor="password" className="m-3">Password</label>
                <input className=" p-2 rounded-lg" 
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
            className="px-6 py-2 m-3 rounded-lg bg-slate-600">Log in</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}