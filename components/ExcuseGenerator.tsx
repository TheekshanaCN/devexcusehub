import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCw, Copy, Check } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ExcuseGeneratorProps {
  onExcuseGenerated?: (excuse: string) => void;
}

const ExcuseGenerator = ({ onExcuseGenerated }: ExcuseGeneratorProps) => {
  const [currentExcuse, setCurrentExcuse] = useState<string>(
    "The code worked on my machine, must be a server environment issue."
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animateExcuse, setAnimateExcuse] = useState<boolean>(false);
  const [magicEffect, setMagicEffect] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  // We'll fetch excuses from Supabase instead of using a mock list

  useEffect(() => {
    if (animateExcuse) {
      const timer = setTimeout(() => {
        setAnimateExcuse(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animateExcuse]);

  useEffect(() => {
    if (magicEffect) {
      const timer = setTimeout(() => {
        setMagicEffect(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [magicEffect]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const generateRandomExcuse = async () => {
    setIsLoading(true);
    setAnimateExcuse(false);
    setMagicEffect(true);
    setCopied(false);

    try {
      // Simulate fetching a random excuse from Supabase
      const excuses = [
        "The server is down for maintenance.",
        "I was waiting for the API to respond.",
        "There was a network issue.",
        "I forgot to commit my changes.",
        "The database is acting up again.",
      ];
      const randomIndex = Math.floor(Math.random() * excuses.length);
      const newExcuse = excuses[randomIndex];

      setCurrentExcuse(newExcuse);
      setAnimateExcuse(true);
      onExcuseGenerated?.(newExcuse);
    } catch (error) {
      console.error("Error generating excuse:", error);
      toast({
        title: "Error",
        description: "Failed to generate excuse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentExcuse);
      } else {
        // Fallback for browsers that don't support the Clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = currentExcuse;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Now you can paste this excuse anywhere!",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-lg shadow-md border border-border flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      {magicEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-ping">
            ✨
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center animate-bounce">
        ✨ Random Developer Excuse Generator 🎲
      </h2>

      <div className="min-h-32 w-full flex items-center justify-center p-6 bg-muted/50 rounded-md border border-border relative group">
        <p
          className={`text-xl text-center font-medium transition-all duration-300 ${
            animateExcuse ? "scale-110 text-primary" : ""
          }`}
        >
          "{currentExcuse}"
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background/80"
          onClick={copyToClipboard}
          aria-label="Copy excuse to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        {animateExcuse && (
          <div className="absolute -right-2 -top-2 animate-bounce text-2xl">
            🤣
          </div>
        )}
        {animateExcuse && (
          <div className="absolute -left-2 -bottom-2 animate-bounce delay-100 text-2xl">
            😂
          </div>
        )}
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button
          onClick={generateRandomExcuse}
          size="lg"
          className={`text-lg px-8 py-6 h-auto transition-transform duration-200 ${
            !isLoading ? "hover:scale-105 hover:rotate-1" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Conjuring excuse...</span>
            </>
          ) : (
            <>
              <span className="mr-2 animate-bounce inline-block">🔮</span>
              Generate Random Excuse
              <span className="ml-2 animate-bounce inline-block delay-150">
                ✨
              </span>
            </>
          )}
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="lg"
          className="text-lg px-4 py-6 h-auto transition-transform duration-200 hover:scale-105 hover:bg-secondary/80"
          disabled={isLoading}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-5 w-5 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="mr-2 h-5 w-5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExcuseGenerator;
