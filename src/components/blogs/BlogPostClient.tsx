// components/blogs/BlogPostClient.tsx
'use client';
import React from "react";
import BlogPost1 from "./BlogPost1";
import useFetchSinglePost from "../requests/fetchPostId";

interface BlogPostClientProps {
  id: string;
}

export default function BlogPostClient({ id }: BlogPostClientProps) {
  const { post, error, isLoading } = useFetchSinglePost(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-red-500">خطأ في تحميل المقال</div>
      </div>
    );
  }

  // Map your API data to the BlogItem format
  const blogItem = {
    imgSrc: post.image || "/assets/images/blog/default.jpg",
    alt: post.title,
    date: new Date(post.created_at_meta).toLocaleDateString('ar-EG'),
    author: post.owner_title || "مستخدم",
    authorAvatar: post.image_owner || "/assets/images/avatar/default-avatar.jpg",
    authorDesc: post.user?.bio || "كاتب ومحرر",
    authorName: post.user?.username || "راسيات",
    authorFlow: post.user?.followers_count || 0,
    category: post.category || "عام",
    title: post.title,
    description: post.description,
    content: post.content // Add this if you need the full content
  };

  return <BlogPost1 blogItem={blogItem} />;
}