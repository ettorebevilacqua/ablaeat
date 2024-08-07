import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextApiRequest, NextApiResponse } from "next";
  // const { email, password } = req.body
async function signUp(req: NextApiRequest, res: NextApiResponse) {
  const test = { email: 'email@email.com', password : 'password' }

  const supabase = createRouteHandlerClient();
  console.log('xxxxxxxxxxx',  req.body);
  const { user, error } = await supabase.auth.signUp(test)

  if (error) return res.status(400).json({ error: error.message })
  return res.status(200).json({ user })
}


// Notice the function definition:
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return signUp(req, res);
}