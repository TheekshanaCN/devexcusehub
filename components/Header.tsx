//Header.tsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, Code2Icon } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  title?: string;
  tagline?: string;
}

const Header = ({
  title = "Dev Excuse Hub 🧙‍♂️",
  tagline = "Where developers come clean about why the code isn't working 🤷‍♂️",
}: HeaderProps) => {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 group">
          <img
            src="/icon.png"
            alt="Dev Excuses Icon"
            className="h-12 w-12 text-primary group-hover:animate-spin transition-all duration-300"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {title}
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:animate-bounce">
                🧙‍♂️
              </span>
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block group-hover:text-foreground/80 transition-colors duration-300">
              {tagline}
              <span className="ml-1 opacity-0 group-hover:opacity-100 inline-block transition-all duration-300 group-hover:animate-bounce">
                🤷‍♂️
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const ThemeToggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative overflow-hidden group transition-all duration-300 hover:scale-110 hover:rotate-12"
    >
      {theme === "dark" ? (
        <>
          <SunIcon className="h-4 w-4 group-hover:animate-spin" />
          <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs animate-bounce">
            ☀️
          </span>
        </>
      ) : (
        <>
          <MoonIcon className="h-4 w-4 group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs animate-bounce">
            🌙
          </span>
        </>
      )}
    </Button>
  );
};

export default Header;
