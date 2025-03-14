import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

let headers = { 'accept-language': 'en,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'de']
let defaultLocale = 'en'

match(languages, locales, defaultLocale) // -> 'en'

function getLocale(request: NextRequest) { return match(new Negotiator({ headers }).languages(), locales, defaultLocale) }

export async function middleware(request: NextRequest) {

  const url = new URL(request.url) 

  //  API and action routes  
  if(url.pathname.startsWith('/api') || url.pathname.startsWith('/action')) {

    console.log('MIDDLEWARE API or action route:', url.pathname);
 

    // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // if (!token) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // request.headers.set('Authorization', `Bearer ${token.accessToken}`);
    return;
  } 

  console.log('MIDDLEWARE NO API / ACTION:', url.pathname);
  // const token = await getToken({ request, secret: process.env.NEXTAUTH_SECRET });

  // if (!token) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/login'; // Redirect to login page
  //   return NextResponse.redirect(url);
  // }

  // set language
  const pathnameHasLocale = locales.some(
    (locale) => url.pathname.startsWith(`/${locale}/`) || url.pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${url.pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}