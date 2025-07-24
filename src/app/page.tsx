"use client";
import PostsList from "@/components/PostList";

export default function Home() {
  return (
      <div className="container flex flex-col justify-center w-screen items-center mx-auto">
        <div className="mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">みんなの投稿一覧</h1>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
          <PostsList apiUrl="/api/posts/public"/>
        </div>
      </div>
    </div>
  );
}


