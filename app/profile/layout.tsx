"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
          </div>
          <Button onClick={() => router.push("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <nav className="md:col-span-1">
            <div className="space-y-2 sticky top-8">
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  Profile Information
                </Button>
              </Link>
              <Link href="/profile/edit">
                <Button variant="ghost" className="w-full justify-start">
                  Edit Profile
                </Button>
              </Link>
              <Link href="/profile/security">
                <Button variant="ghost" className="w-full justify-start">
                  Security Settings
                </Button>
              </Link>
              <Link href="/profile/password">
                <Button variant="ghost" className="w-full justify-start">
                  Change Password
                </Button>
              </Link>
            </div>
          </nav>

          <div className="md:col-span-3">{children}</div>
        </div>
      </main>
    </div>
  )
}
