"use client";
import { format } from "date-fns";
import EditDialog from "./EditDialog";
import { IArticle } from "@/types/types";
import { useSession } from "next-auth/react";

export default function Card({...props}:IArticle) {
  const {id, createdAt, title, content, published, author} = props
  const { status } = useSession();

  // ログインユーザー
  const isLogin = status === "authenticated";

  return (
    <div key={id} className="p-4 shadow-lg shadow-gray-300 rounded-1xl">
      <div>{format(createdAt, "yyyy-MM-dd")}</div>
      <div className="font-bold text-xl py-2">{title ? title : "-"}</div>
      <div>{String(content ? content : "-")}</div>
      <div className="py-2">{published ? "公開" : "非公開"}</div>
      {!isLogin && `投稿者：${author?.name}`}
      {isLogin && <EditDialog {...props}/>}
    </div>
  )
}
