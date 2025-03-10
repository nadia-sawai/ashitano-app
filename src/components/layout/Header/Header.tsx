"use client";
import Styles from "./Header.module.scss"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const {data: session} = useSession();
  return (
    <header  className={Styles.header}>
      <div className={Styles.headerInner}>
        <div className="logo"><Link href="/">logo</Link></div>
        <nav className="flex gap-5 items-center">
          {session && <Link href="/mypage/create">投稿作成ページへ</Link>}
          {session ? <Button onClick={() => signOut()} className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>ログアウト</Button>
          : <Link href="/login" className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>ログイン</Link>
          }
        </nav>
      </div>
    </header>
  )
}
