import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * 公開されている投稿＋ユーザー名を取得
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Failed to fetch public posts", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}