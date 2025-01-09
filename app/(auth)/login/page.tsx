'use client'

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/actions/login";

export default function Login() {
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: ""
  })
  const [isLoginError, setIsLoginError] = useState(false)
  const [isLoginErrorMessage, setIsLoginErrorMessage] = useState<string | null>(null)

  const router = useRouter()

  const handleLoginPayloadChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPayload({ ...loginPayload, [e.target.name]: e.target.value })
    setIsLoginError(false)
    setIsLoginErrorMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = new FormData(e.currentTarget)

    payload.append('email', loginPayload.email)
    payload.append('password', loginPayload.password)

    const user = await login(payload)

    if (user.status === 400) {
      setIsLoginError(true)
      setIsLoginErrorMessage(user.error)
      return
    }

    if (user.status === 200) {
      router.replace('/dashboard')
    }
  }

  return (
    <main>
      <section className="flex items-center justify-center h-screen px-4 md:px-0">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    onChange={handleLoginPayloadChange}
                    required
                  />
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={handleLoginPayloadChange}
                  required
                />
                {isLoginError && <small className="text-red-500">{isLoginErrorMessage}</small>}

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section >
    </main >
  );
}
