"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { GlobeIcon, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

import { ModeToggle } from "./mode-toggle"

export default function DashboardNav() {
  const router = useRouter()

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={"/"} className="flex items-center space-x-4">
          <GlobeIcon className="text-primary size-6" />
          <span className="text-lg font-bold">Translate Hub</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2 size-4" />
            Settings
          </Button>
          <ModeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
            className="hidden md:flex"
          >
            <LogOut className="mr-2 size-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}
