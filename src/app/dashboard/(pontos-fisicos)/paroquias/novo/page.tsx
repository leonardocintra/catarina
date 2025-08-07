"use client";

import { Suspense } from "react";
import NovaParoquiaInner from "./nova-paroquia-inner";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function NovaParoquiaPage() {
  return (
    <Suspense fallback={<SkeletonLoading mensagem="Validando diocese ..." />}>
      <NovaParoquiaInner />
    </Suspense>
  );
}
