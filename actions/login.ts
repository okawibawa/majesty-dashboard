'use server'

import { createClient } from "@/utils/supabase/server"

export const login = async (payload: FormData) => {
  const supabase = await createClient()

  const email = payload.get('email') as string
  const password = payload.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { status: 500, error: error.message }
  }

  return { status: 200, error: null }
}
