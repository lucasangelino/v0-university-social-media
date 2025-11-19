'use client'

import { useState } from 'react'
import { useAuth } from './auth-provider'
import { Comment } from './feed'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { formatDistanceToNow } from 'date-fns'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  onAddComment: (postId: string, content: string) => void
}

export function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    onAddComment(postId, newComment)
    setNewComment('')
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px] resize-none text-sm"
            maxLength={280}
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="sm"
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3 pl-2 border-l-2 border-border">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {comment.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-xs">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
