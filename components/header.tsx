"use client"

import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <header className="flex justify-between p-8 mx-auto max-w-7xl">
      <Link href="/campaigns" className="text-lg font-bold">
        Campaign Dashboard
      </Link>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {user.username
                  .split("-")
                  .map((part) => part[0].toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1">
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout()
                router.push("/login")
              }}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
