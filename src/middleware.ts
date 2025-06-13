import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production";

  // token取得
  const token = req.cookies.get(
    isProduction
      ? "__Secure-authjs.session-token" //HTTPS通信かつ Secure属性付き
      : "authjs.session-token"
  )?.value;

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
