import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const postCreateSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  content: z.string().optional()
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth(); // ✅ 認証情報を取得

    // セッションがない場合
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const json = await req.json();
    // schemaに基づく型チェック
    const body = postCreateSchema.parse(json);
    const {title, content} = body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id //認証ユーザーのIDをセット
      },
      select: {
        id: true
      }
    })

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(err.issues, { status: 422 });
    }
    // zodエラー以外は500
    return NextResponse.json(null, { status: 500 });
  }
}