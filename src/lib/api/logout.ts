"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return async () => {
    await fetch("/api/ambrosio/auth/logout", { method: "POST" });

    // Redireciona para login ("/")
    router.push("/");
  };
}
