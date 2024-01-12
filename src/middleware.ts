import {withAuth} from "next-auth/middleware";
import { NextResponse } from 'next/server';
import {NextMiddlewareResult} from "next/dist/server/web/types";

export const config = {
  matcher: ["/(post|users|contacts|settings)/:path*"]
};

// @ts-ignore
export default withAuth(
  function middleware(req) {
    // callbacks.authorizedがtrueの場合のみ進入できる
    const requestHeaders = new Headers(req.headers);
    const path = req.nextUrl.pathname;
    requestHeaders.set('x-path', path);

    return NextResponse.next({
      request: {
        // Apply new request headers
        headers: requestHeaders,
      }
    });
  },
  {
    callbacks: {
      authorized: ({token}) => {
        if(token) return true
      },
    },
  }
)
