import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successfully",
                success: true
            }
        )
        // remove the token from cookies
        response.cookies.set("token", "", 
        {
            httpOnly: true, expires: new Date(0)
        })

        // now, return the response
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}