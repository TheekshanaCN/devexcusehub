"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import ExcuseGenerator from "@/components/ExcuseGenerator";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Excuse Generator */}
          <section className="py-8">
            <ExcuseGenerator />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </ThemeProvider>
  );
}
