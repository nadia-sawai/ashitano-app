"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="container flex flex-col justify-center h-screen w-screen items-center mx-auto">
      <div className="mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Googleアカウントでログイン</h1>
        <Button className={buttonVariants({variant: "default", size: "sm"})} onClick={() => signIn('google')}>Sign in with Google</Button>
      </div>
    </div>
  );
}
