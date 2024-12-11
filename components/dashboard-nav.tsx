"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GlobeIcon, Settings, LogOut } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

export default function DashboardNav() {
    const router = useRouter()

    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href={"/"} className="flex items-center space-x-4">
                    <GlobeIcon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Translate Hub</span>
                </Link>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/settings")}
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                    </Button>
                    <ModeToggle />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/login")}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </nav>
    )
}
