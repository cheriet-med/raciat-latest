// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { PreloaderProvider } from "@/context/PreloaderContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PreloaderProvider>{children}</PreloaderProvider>
    </SessionProvider>
  );
}
