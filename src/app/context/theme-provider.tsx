"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProviderContext({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class" // usa classe no <html>
      defaultTheme="system" // tema do sistema
      enableSystem={true}
    >
      {children}
    </ThemeProvider>
  );
}
