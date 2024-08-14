ort { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '~/utils/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = '/users/account'

  console.log('api/auth/confirm')

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

    const url = request.nextUrl.clone()

  if (token_hash && type) {
    const supabase = await createClient()

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      console.log('confirm error ', data)
      redirectTo.searchParams.delete('next')
      url.pathname = '/login'

      return NextResponse.redirect(url)
    } else console.log('confirm error ', error)
  }

  // return the user to an error page with some instructions
  url.pathname = '/error'
  return NextResponse.redirect(url)
}
