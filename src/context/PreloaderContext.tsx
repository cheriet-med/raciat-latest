"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface PreloaderContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};

export const PreloaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  // Hide initial preloader after a short delay (initial page load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      isFirstMount.current = false;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show preloader on client-side navigation (path changes)
  useEffect(() => {
    // skip on first mount (initial page load already handled)
    if (isFirstMount.current) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <PreloaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
};