import { z } from "zod"

export const UserFormSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
})

export type User = z.infer<typeof UserFormSchema>
