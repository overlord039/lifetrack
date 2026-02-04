import { NextResponse, type NextRequest } from 'next/server';

// This is a mock authentication check. In a real application,
// you would verify a session token against a backend service.
function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('auth_session');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuth = isAuthenticated(request);
  const isAuthPage = pathname.startsWith('/login');
  const isApiRoute = pathname.startsWith('/api');

  // Allow API routes to be accessed
  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthPage) {
    if (isAuth) {
      // If the user is authenticated, redirect from login to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If not authenticated, show the login page
    return null;
  }

  if (!isAuth) {
    // If not authenticated and not on the login page, redirect to login
    let from = pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except for static files, images, and the favicon
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
