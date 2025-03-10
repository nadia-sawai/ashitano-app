"use client";
import PostCreateButton from "@/components/post-create-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="container flex flex-col justify-center w-screen items-center mx-auto">
      <div className="mx-auto flex flex-col gap-4 w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">記事追加</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="title" className="text-gray-700 text-lg font-medium mb-1.5">タイトル</Label>
          <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"/>
          <Label htmlFor="content" className="text-gray-700 text-lg font-medium mt-3 mb-1.5">コンテンツ</Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"/>
          <PostCreateButton className="mt-5" title={title} content={content} />
        </form>
      </div>
    </div>
  );
}


