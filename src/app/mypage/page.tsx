"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PostsList from "@/components/PostList";

export default function Mypage() {
  // status: "loading" | "authenticated" | "unauthenticated"
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>読み込み中...</p>;
  } else if(status !== "authenticated") {
    return;
  }

  // ログインユーザー情報の取得
  const user = session?.user;

  return (
      <div className="container flex flex-col justify-center w-screen items-center mx-auto">
        <div className="mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">マイページ</h1>
        <h2 className="font-semibold">ユーザー情報</h2>
        <div className="space-y-4 mb-5">
          <table className="px-8 py-2 w-full table-auto border border-slate-500">
            <thead>
              <tr>
                <th className="px-8 py-2 border border-slate-600">Name</th>
                <th className="px-8 py-2 border border-slate-600">E-mail</th>
                <th className="px-8 py-2 border border-slate-600">Picture</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-8 py-2 border border-slate-700">{user.name ? user.name : "-"}</td>
                <td className="px-8 py-2 border border-slate-700">{user.email ? user.email : "-"}</td>
                <td className="px-8 py-2 border border-slate-700">{user.image ? <Image src={user.image} width={200} height={200} priority alt="" /> : "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-semibold">ユーザー投稿一覧</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
          <PostsList />
        </div>
      </div>
    </div>
  );
}


