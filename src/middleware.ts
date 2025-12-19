import { NextRequest, NextResponse } from "next/server";

const EXACT_PUBLIC_ROUTES = ["/", "/favicon.ico", "/logo.webp", "/cadastro", "/cadastro/sucesso"];
const PUBLIC_PREFIX_ROUTES = ["/_next", "/images"]; // se tiver outras pastas públicas, adicione aqui

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isPublic =
    EXACT_PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIX_ROUTES.some((route) => pathname.startsWith(route));

  if (!token && !isPublic) {
    // console.log("Bloqueando rota privada:", pathname);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|logo.webp|logo.png|images).*)"],
};
