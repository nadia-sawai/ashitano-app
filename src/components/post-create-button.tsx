"use client";

import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostCreateButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {}

export default function PostCreateButton({
  className,
  variant,
  size,
  ...props
}:PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { title, content } = props;

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title, content})
    });

    setIsLoading(false);
    console.log(response)
    if(response.ok) {
      alert("投稿成功！マイページに遷移します！")
      router.push("/mypage");  
    } else {
      alert("投稿に失敗しました")
      setError(true)
    }
  }


  return (
    <>
    <Button className={cn(className)} disabled={isLoading} variant={variant} size={size} {...props} onClick={handleSubmit}>
      作成
    </Button>
    {error && <p className="text-red-700">タイトルを入力してね</p>}
  </>
  )
}