import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getSession } from 'next-auth/react';

let headers = { 'accept-language': 'en,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'de']
let defaultLocale = 'en'

match(languages, locales, defaultLocale) // -> 'en'

function getLocale(request: NextRequest) { return match(new Negotiator({ headers }).languages(), locales, defaultLocale) }

export async function middleware(request: NextRequest) {

  const url = new URL(request.url) 

  // let API and action routes unchanged   
  if(url.pathname.startsWith('/api') || url.pathname.startsWith('/action')) {
    return
  } 

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