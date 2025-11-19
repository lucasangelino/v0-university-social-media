'use client'

import { useState } from 'react'
import { Post } from './feed'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { MessageCircle, Heart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { CommentSection } from './comment-section'

interface PostCardProps {
  post: Post
  onAddComment: (postId: string, content: string) => void
}

export function PostCard({ post, onAddComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {post.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{post.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </span>
          </div>
          
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>

          <div className="flex items-center gap-4 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-primary"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments.length}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-xs">{liked ? 1 : 0}</span>
            </Button>
          </div>

          {showComments && (
            <CommentSection
              postId={post.id}
              comments={post.comments}
              onAddComment={onAddComment}
            />
          )}
        </div>
      </div>
    </div>
  )
}
