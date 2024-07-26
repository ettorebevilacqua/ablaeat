import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export default async function signUp(req, res) {
  const { email, password } = req.body
  const supabase = createRouteHandlerClient()

  const { user, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user })
}