"use client"
import Link from "next/link";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import React, { useState } from "react";

export default function UserProfile() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get('/api/users/me')
        console.log(response.data);
        setData(response.data.data.username)
        
    }
    console.log(data);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Your Profile</h1>
            <h2>{data === 'nothing' ? "Nothing" : <Link 
            href={`/profile/${data}`}>
            User ID: {data}</Link>}</h2>
            <button
            onClick={logout}
            className=" px-6 py-2 m-3 rounded-lg bg-slate-600"
            >Logout</button>
            <button
            onClick={getUserDetails}
            className=" px-6 py-2 m-3 rounded-lg bg-green-600"
            >User Me</button>
        </div>
    )
}
