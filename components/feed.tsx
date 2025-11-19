'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './auth-provider'
import { CreatePost } from './create-post'
import { PostCard } from './post-card'

export interface Post {
  id: string
  author: {
    name: string
    email: string
  }
  content: string
  timestamp: Date
  comments: Comment[]
}

export interface Comment {
  id: string
  author: {
    name: string
    email: string
  }
  content: string
  timestamp: Date
}

export function Feed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(() => {
    const storedPosts = localStorage.getItem('posts')
    if (storedPosts) {
      const parsed = JSON.parse(storedPosts)
      return parsed.map((post: Post) => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments.map((comment: Comment) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        }))
      }))
    }
    return []
  })

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts))
    }
  }, [posts])

  const handleCreatePost = (content: string) => {
    if (!user) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        email: user.email,
      },
      content,
      timestamp: new Date(),
      comments: [],
    }

    setPosts([newPost, ...posts])
  }

  const handleAddComment = (postId: string, content: string) => {
    if (!user) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        email: user.email,
      },
      content,
      timestamp: new Date(),
    }

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ))
  }

  return (
    <div className="w-full">
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b border-border p-4">
        <h2 className="text-xl font-bold">Home</h2>
      </header>

      <CreatePost onCreatePost={handleCreatePost} />

      <div className="divide-y divide-border">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onAddComment={handleAddComment}
            />
          ))
        )}
      </div>
    </div>
  )
}
