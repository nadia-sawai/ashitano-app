"use client";
import { format } from "date-fns";
import EditDialog from "./EditDialog";
import { IArticle } from "@/types/types";

export default function Card({...props}:IArticle) {
  const {id, createdAt, title, content, published} = props

  return (
    <div key={id} className="p-4 shadow-lg shadow-gray-300 rounded-1xl">
      <div>{format(createdAt, "yyyy-MM-dd")}</div>
      <div className="font-bold text-xl py-2">{title ? title : "-"}</div>
      <div>{String(content ? content : "-")}</div>
      <div className="py-2">{published ? "公開" : "非公開"}</div>
      <EditDialog {...props}/>
    </div>
  )
}
