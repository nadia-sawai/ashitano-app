"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { IArticle } from "@/types/types"
import { useEffect, useState } from "react";
import FieldBoxWrap from "./form/FieldWrap/FieldBoxWrap";
import FieldBox from "./form/FieldBox/FieldBox";
import { Switch } from "./ui/switch";
import { mutate } from "swr";

export default function EditDialog({...props}:IArticle) {
  const {id, title, content, published} = props;
  // dialog state
  const [open, setOpen] = useState(false);
  // form state
  const [form, setForm] = useState({
    title: "--",
    content: "--",
    published: false
  })
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm({
        title: title || "",
        content: content || "",
        published: published ?? false,
      });
      // メッセージ初期化
      setApiMessage(null);
    }
  }, [open, title, content, published]);
  const handleClose = () => {
    setOpen(false);
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id,
          title: form.title,
          content: form.content,
          published: form.published
        })
      })

      if (!response.ok) throw new Error("更新に失敗しました");
      const updatedPost = await response.json();
      console.log("更新成功:", updatedPost);
      setApiMessage(updatedPost.message);
      // リスト再フェッチ
      mutate("/api/posts");
      mutate("/api/posts/public");

    } catch (error) {
      console.error("更新エラー:", error);
      setApiMessage("更新に失敗しました");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
  setForm((prev) => ({
    ...prev,
    published: checked,
  }));
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="cursor-pointer">編集</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            記事編集
          </DialogTitle>
        </DialogHeader>
        {apiMessage ? (
          <div className="text-sm text-green-600 mt-2">
            {apiMessage}
          </div>
        ):(
          <FieldBoxWrap>
            <FieldBox>
              <label className="w-24 font-semibold" htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="タイトル"
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
            </FieldBox>
            <FieldBox>
              <label className="w-24 font-semibold" htmlFor="content">Content</label>
              <input
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="コンテンツ"
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
            </FieldBox>
            <FieldBox>
              <label className="w-24 font-semibold" htmlFor="published">Content</label>
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={handleSwitchChange}
                className="cursor-pointer"
              />
            </FieldBox>
          </FieldBoxWrap>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="cursor-pointer">{!apiMessage ? "キャンセル" : "閉じる"}</Button>
          {!apiMessage && <Button type="submit" onClick={handleSubmit} className="cursor-pointer">更新</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
