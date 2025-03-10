import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // token取得
  const token = await getToken({ req });
  // あればtrue, なければfalse
  const isAuth = !!token;

  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  
  // /loginにアクセスしたとき
  if(isAuthPage) {
    // ログイン中ならリダイレクト
    if(isAuth) {
      // 第2引数のreq.urlをつけると絶対パスが含まれる
      return NextResponse.redirect(new URL("/mypage", req.url));
    }
    return NextResponse.next();
  }

  // マッチャーで指定した/mypage にアクセスしたときで、ログインしていない場合はリダイレクト
  if(!isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

// matcherでmiddlewareを適用するルートを指定
export const config = {
  matcher: ["/login", "/mypage/:path*"],
};
