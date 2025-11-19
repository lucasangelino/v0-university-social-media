'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface CreatePostProps {
  onCreatePost: (content: string) => void
}

export function CreatePost({ onCreatePost }: CreatePostProps) {
  const { user } = useAuth()
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    onCreatePost(content)
    setContent('')
  }

  if (!user) return null

  return (
    <div className="p-4 border-b border-border">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's happening at university?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-base"
              maxLength={280}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {content.length}/280
              </p>
              <Button 
                type="submit" 
                disabled={!content.trim()}
                size="sm"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
