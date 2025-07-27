"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import ExcuseGenerator from "@/components/ExcuseGenerator";
import ExcuseSubmissionForm from "@/components/ExcuseSubmissionForm";
import ExcuseLeaderboard from "@/components/ExcuseLeaderboard";

export default function Home() {
  const handleExcuseSubmitted = (data: any) => {
    console.log("New excuse submitted:", data);
  };

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

        {/* Two Column Layout for Submission Form and Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Excuse Submission Form */}
          <div className="lg:col-span-4 flex justify-center max-h-[400px] overflow-y-auto">
            <ExcuseSubmissionForm onSubmit={handleExcuseSubmitted} />
          </div>

          {/* Excuse Leaderboard */}
          <div className="lg:col-span-8">
            <ExcuseLeaderboard />
          </div>
        </section>

        {/* Footer */}
        <Footer />
        <Toaster />
      </main>
    </ThemeProvider>
  );
}
