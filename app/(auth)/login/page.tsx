'use client'

import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = new FormData(e.currentTarget)

    payload.append('email', loginPayload.email)
    payload.append('password', loginPayload.password)

    const user = await login(payload)

    console.log(user)
  }

  return (
    <main>
      <section className="flex items-center justify-center h-screen px-4 md:px-0">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
                    onChange={(e) => setLoginPayload({ ...loginPayload, email: e.target.value })}
                    required
                  />
                </div>

                <Input id="password" type="password" placeholder="********" onChange={(e) => setLoginPayload({ ...loginPayload, password: e.target.value })} required />

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
