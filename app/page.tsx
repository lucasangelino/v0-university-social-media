'use client'

import { useAuth } from '@/components/auth-provider'
import { Sidebar } from '@/components/sidebar'
import { Suggestions } from '@/components/suggestions'
import { Feed } from '@/components/feed'

export default function HomePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex w-64 flex-shrink-0 sticky top-0 h-screen">
          <Sidebar />
        </aside>

        {/* Main Feed (Centered) */}
        <main className="flex-1 border-x border-border min-h-screen">
          <Feed />
        </main>

        {/* Right Suggestions */}
        <aside className="hidden xl:flex w-80 flex-shrink-0 sticky top-0 h-screen">
          <Suggestions />
        </aside>
      </div>
    </div>
  )
}
