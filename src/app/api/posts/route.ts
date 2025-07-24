import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import * as z from "zod";

/**
 * 作成
 */
const postCreateSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  content: z.string().optional(),
  published: z.boolean(),
})
export async function POST(req: NextRequest) {
  try {
    // 認証確認
    const session = await auth();

    // セッションがない場合
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // jsonをパース / バリデーション
    const json = await req.json();
    const body = await postCreateSchema.parseAsync(json);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: session.user.id //認証ユーザーのIDをセット
      },
      select: {
        id: true
      }
    })

    return NextResponse.json({id: post.id}, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation Error", err.issues);
      return NextResponse.json({ error: "Validation Error", details: err.issues}, { status: 422 });
    }
    // zodエラー以外は500
    console.error("Unexpected Error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * 更新
 */
const postUpdateSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "タイトルを入力してください"),
  content: z.string().optional(),
  published: z.boolean(),
});
export async function PATCH(req: NextRequest) {
  try {
    // 認証確認
    const session = await auth();

    // セッションがない場合
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // jsonをパース / バリデーション
    const json = await req.json();
    const body = await postUpdateSchema.parseAsync(json);

    const updated = await prisma.post.update({
      where: { id:body.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    })
    console.log(updated);

    return NextResponse.json({post: updated, message: "更新しました"}, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation Error", err.issues);
      return NextResponse.json({ error: "Validation Error", details: err.issues}, { status: 422 });
    }
    // zodエラー以外は500
    console.error("Update Error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * ログインユーザーの記事取得
 */
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: user.id }, // ログインユーザーの投稿のみ
      orderBy: { createdAt: "desc" }, // 投稿日順
    });

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Failed to fetch posts", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}




// 投稿一覧取得
// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(posts);
//   } catch (err) {
//     console.error("Failed to fetch posts", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }