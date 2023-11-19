import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

// export {default} from "next-auth/middleware"

export default withAuth(
    function middleware(request: NextRequestWithAuth){
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);
    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        }
    }
    
)

export const config = {matcher: ["/owner/:path*","/admin/:path*"]}