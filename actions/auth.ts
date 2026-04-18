'use server'

import { clearGoogleDriveTokens } from '@/lib/google-drive/auth'
import { getRequestOrigin } from '@/lib/request-origin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signUp(formData: FormData) {
  const supabase = await createClient()
  const origin = getRequestOrigin(await headers())
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/?message=Could not authenticate user')
  }

  return redirect('/?message=Check email to continue sign in process')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/?message=Could not authenticate user')
  }

  return redirect('/')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const origin = getRequestOrigin(await headers())
  const callbackUrl = new URL('/auth/callback', origin)

  callbackUrl.searchParams.set('next', '/drive')

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: callbackUrl.toString(),
      scopes: 'openid email profile https://www.googleapis.com/auth/drive.file',
      queryParams: {
        access_type: 'offline',
        include_granted_scopes: 'true',
        prompt: 'consent',
      },
    },
  })

  if (error || !data.url) {
    return redirect('/?message=Unable to start Google sign in')
  }

  return redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  await clearGoogleDriveTokens()
  return redirect('/')
}
