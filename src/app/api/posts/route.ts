import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

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