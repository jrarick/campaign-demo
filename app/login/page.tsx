"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { User, UserFormSchema } from "@/schemas/user-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  const form = useForm<User>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: User) {
    if (login(values.username, values.password)) {
      router.push("/campaigns")
    } else {
      form.setError("username", {
        type: "manual",
        message: "Invalid username or password",
      })
    }
  }

  return (
    <div className="flex justify-center mx-auto my-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              className="space-y-8"
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Sign in</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
