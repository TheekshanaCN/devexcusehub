import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RefreshCw, Copy, Check, Wand2, Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

interface ExcuseGeneratorProps {
  onExcuseGenerated?: (excuse: string) => void;
}

const ExcuseGenerator = ({ onExcuseGenerated }: ExcuseGeneratorProps) => {
  const [userProblem, setUserProblem] = useState<string>("");
  const [currentExcuse, setCurrentExcuse] = useState<string>(
    "Describe your coding disaster above and I'll magically generate the perfect excuse! ✨"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animateExcuse, setAnimateExcuse] = useState<boolean>(false);
  const [magicEffect, setMagicEffect] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [mood, setMood] = useState<"happy" | "sad" | "neutral">("neutral");
  const { toast } = useToast();
  const { width, height } = useWindowSize();

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
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const generateProblemBasedExcuse = async () => {
    if (!userProblem.trim()) {
      toast({
        title: "Hold up! 🛑",
        description: "You forgot to describe your coding catastrophe!",
        variant: "destructive",
      });
      setMood("sad");
      return;
    }

    setIsLoading(true);
    setAnimateExcuse(false);
    setMagicEffect(true);
    setCopied(false);
    setMood("happy");

    try {
      // Call the API to generate an excuse
      const response = await fetch('/api/generate-excuse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userProblem,
          userId: "mock-user-id" // Using mock user ID as specified
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate excuse');
      }

      const data = await response.json();

      if (data.excuse && data.excuse.text) {
        setCurrentExcuse(data.excuse.text);
        setAnimateExcuse(true);
        setShowConfetti(true);
        onExcuseGenerated?.(data.excuse.text);
      } else {
        throw new Error('Invalid excuse format');
      }
    } catch (error) {
      console.error("Error generating excuse:", error);
      toast({
        title: "Oh no! 💥",
        description: "Our excuse generator needs an excuse! Please try again.",
        variant: "destructive",
      });
      setMood("sad");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentExcuse);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = currentExcuse;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      toast({
        title: "Excuse copied! 📋",
        description: "Paste this masterpiece wherever you need!",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed! 🚫",
        description: "The excuse resisted being copied! Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-lg shadow-md border border-border flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      {magicEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-ping">
            ✨
          </div>
        </div>
      )}

      {showConfetti && width && height && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      <h2 className="text-3xl font-bold text-center text-white animate-float">
        ✨ The Magical Excuse Generator 🧙‍♂️
      </h2>

      <div className="w-full space-y-2">
        <label htmlFor="problem-input" className="text-sm font-medium flex items-center text-white">
          <Wand2 className="mr-2 h-4 w-4 text-white" />
          Describe your coding catastrophe:
        </label>
        <Textarea
          id="problem-input"
          value={userProblem}
          onChange={(e) => setUserProblem(e.target.value)}
          placeholder="My code was working yesterday but today it's summoning demons instead..."
          className="min-h-[120px] text-lg bg-background/80 hover:bg-background/90 transition-all text-white"
        />
      </div>

      <div className="min-h-40 w-full flex items-center justify-center p-6 bg-muted/50 rounded-md border border-border relative group transition-all hover:shadow-lg">
        <p
          className={`text-xl text-center font-medium transition-all duration-300 text-white ${
            animateExcuse ? "scale-110" : ""
          }`}
        >
          "{currentExcuse}"
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background/80 text-white"
          onClick={copyToClipboard}
          aria-label="Copy excuse to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500 animate-bounce" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        {animateExcuse && (
          <>
            <div className="absolute -right-2 -top-2 animate-bounce text-2xl">
              {mood === "happy" ? "🤣" : mood === "sad" ? "😭" : "🤔"}
            </div>
            <div className="absolute -left-2 -bottom-2 animate-bounce delay-100 text-2xl">
              {mood === "happy" ? "🎉" : mood === "sad" ? "💥" : "🧐"}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Button
          onClick={generateProblemBasedExcuse}
          size="lg"
          className={`text-lg px-8 py-6 h-auto transition-all duration-200 bg-white text-black hover:bg-white/90 hover:shadow-lg ${
            isLoading ? "bg-white/80" : ""
          } relative overflow-hidden`}
          disabled={isLoading}
        >
          {isLoading && (
            <span className="absolute inset-0 bg-black/10 animate-pulse"></span>
          )}
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Consulting the code spirits...</span>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              <span>Conjure Magical Excuse</span>
              <span className="ml-2 animate-float delay-300">🤷‍♂️</span>
            </>
          )}
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="lg"
          className="text-lg px-4 py-6 h-auto transition-all duration-200 hover:scale-105 bg-white text-black hover:bg-white/90 hover:shadow-md"
          disabled={isLoading}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-5 w-5 text-green-500 animate-tick" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="mr-2 h-5 w-5" />
              <span>Copy Spell</span>
            </>
          )}
        </Button>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes tick {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-tick {
          animation: tick 0.5s;
        }
      `}</style>
    </div>
  );
};

export default ExcuseGenerator;