import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isMemberRoute = createRouteMatcher(['/member(.*)']);

export default clerkMiddleware((auth, request) => {
  if (isMemberRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'],
};
