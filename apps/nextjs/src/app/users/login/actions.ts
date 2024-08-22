'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '~/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const dataForm = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Object.keys(supabase).map(k=>console.log('key', k))

  const { data, error } = await supabase.auth.signInWithPassword(dataForm)

  if (error) {
	 console.log('error login', error)
    redirect('/error')
  } // else console.log('login', data)
  
  revalidatePath('/', 'layout')
  redirect('/users/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
      console.log('error', error)
        redirect('/error')
      /* toast.show('Sign up failed', {
        message: error.message,
      }) */ 
    } else if (data?.user) {
		console.log('user', data?.user)
      /* toast.show('Email Confirmation', {
        message: 'Check your email ',
      }) */
    }
  revalidatePath('/', 'layout')
  redirect('/users/checkMail')
}

 const handleEmailSignUpWithPress = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      console.log('error', error)
      toast.show('Sign up failed', {
        message: error.message,
      })
    } else if (data?.user) {
      toast.show('Email Confirmation', {
        message: 'Check your email ',
      })
      push('/')
    }
  }
