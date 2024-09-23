import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAUTLT_LOGIN_REDIRECT,
  protectedRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth; // Check if user is authenticated
  const isApiAuthRoutes = pathname.startsWith(apiAuthPrefix); // Check if API route
  const isPublicRoute = publicRoutes.includes(pathname); // Check if public route
  const isAuthRoute = authRoutes.includes(pathname); // Check if it's login/register routes
  const isProtectedRoute = protectedRoutes.includes(pathname); // Check if protected route

  // Skip API routes
  if (isApiAuthRoutes) return null;

  // Allow access to auth routes for unauthenticated users
  if (isAuthRoute && !isLoggedIn) {
    return null; // Allow access to login/register when NOT logged in
  }

  // Redirect authenticated users away from login/register routes
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAUTLT_LOGIN_REDIRECT, nextUrl), 308);
  }

  // If trying to access protected route while not logged in, redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl), 308);
  }

  // Allow access to public routes for everyone
  if (isPublicRoute) {
    return null;
  }

  // Default: no action, allow navigation
  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
