"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-background">
        <Header />
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Welcome to Dev Excuse Hub!
        </h2>
        <p className="text-muted-foreground mb-6">Dev Excuse Hub</p>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
