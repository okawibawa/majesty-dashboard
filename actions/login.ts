'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export const login = async (payload: FormData) => {
  const supabase = await createClient()

  const email = payload.get('email') as string
  const password = payload.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { status: error.status, error: error.message }
  }

  cookies().set('pst-2k_t', data.session.access_token)
  cookies().set('pst-2k_r', data.session.refresh_token)

  return { status: 200, error: null }
}
