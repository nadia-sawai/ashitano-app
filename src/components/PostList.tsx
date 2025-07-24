"use client";
import useSWR from "swr";
import { IArticleFromApi } from "@/types/types";
import Card from "./Card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostsList() {
  const { data: posts, error, isLoading } = useSWR("/api/posts", fetcher);

  if (error) return <p className="text-red-500">データ取得に失敗しました</p>;
  if (isLoading) return <p>読み込み中...</p>;

  return (
    <>
      {posts.map((post: IArticleFromApi) => (
        <Card key={post.id} {...post} />
      ))}
    </>
  );
}