import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from "next";

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  const supabase = createRouteHandlerClient()
  console.log('xxxxxxxxxxx',  req.body);
  const { user, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user })
}