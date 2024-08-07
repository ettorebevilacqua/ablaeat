export { auth as middleware } from "@acme/auth";
import { type NextRequest } from 'next/server'
import { updateSession } from '~/utils/supabase/middleware'

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

const supBaseMatch = '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)';
const nextMatch = '/((?!api|_next/static|_next/image|favicon.ico).*)';
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [nextMatch, supBaseMatch]
};


export async function middleware2(request: NextRequest) {
  return await updateSession(request)
}
/*
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
*/