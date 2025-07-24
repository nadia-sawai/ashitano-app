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
          <span>ようこそ {session?.user.name ?? "ゲスト"} さん</span>
          {session && (
            <>
              <Link href="/mypage">マイページ</Link>
              <Link href="/mypage/create">新規追加</Link>
            </>
          )}
          {session ? <Button onClick={() => signOut()} className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>ログアウト</Button>
          : <Link href="/login" className={cn(buttonVariants({variant: "secondary", size: "sm"}), "px-4")}>ログイン</Link>
          }
        </nav>
      </div>
    </header>
  )
}
