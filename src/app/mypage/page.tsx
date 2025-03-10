import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export default async function Mypage() {
  const user = await getCurrentUser();
  console.log(user)

  if(!user) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  })
  console.log(posts)
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
              <td className="px-8 py-2 border border-slate-700">{user.image ? <Image src={user.image} width={200} height={200} alt="" /> : "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2 className="font-semibold">ユーザー投稿一覧</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="mb-3">
            <div>{post.title}</div>
            <div>{format(post.createdAt, "yyyy-MM-dd")}</div>
            <div>{String(post.content)}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}


