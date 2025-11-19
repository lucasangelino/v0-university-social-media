'use client'

import { useAuth } from './auth-provider'
import { Button } from './ui/button'
import { Home, User, LogOut, BookOpen, Users, Bell } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-primary">SEGURIDADS</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start gap-3 text-base" asChild>
          <Link href="/">
            <Home className="h-5 w-5" />
            Home
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 text-base" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 text-base" asChild>
          <Link href="/courses">
            <BookOpen className="h-5 w-5" />
            Courses
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 text-base" asChild>
          <Link href="/students">
            <Users className="h-5 w-5" />
            Students
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 text-base" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
            Profile
          </Link>
        </Button>
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <div className="mb-3 px-3">
          <p className="font-semibold text-sm">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-base text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
