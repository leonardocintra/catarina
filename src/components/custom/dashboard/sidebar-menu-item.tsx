"use client";

import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type SidebarMenuItemProps = {
  description: string;
  href: string;
  icon: ReactNode;
  badge?: string;
};

export default function SidebarMenuItem({
  description,
  href,
  icon,
  badge,
}: SidebarMenuItemProps) {
  const path = usePathname();

  let activeItem =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  if (path === href) {
    activeItem =
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
  }

  return (
    <Link href={href} className={activeItem}>
      {icon ? icon : <Home className="h-4 w-4" />}

      {description}

      {badge && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
}
