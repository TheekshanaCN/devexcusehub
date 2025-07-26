import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExcuseCardProps {
  id: string;
  excuse: string;
  author?: string;
  upvotes?: number;
  downvotes?: number;
  onUpvote?: (id: string) => void;
  onDownvote?: (id: string) => void;
  className?: string;
}

const ExcuseCard = ({
  id,
  excuse = "It works on my machine!",
  author = "Anonymous Developer",
  upvotes = 0,
  downvotes = 0,
  onUpvote = () => {},
  onDownvote = () => {},
  className,
}: ExcuseCardProps) => {
  const [isUpvoteAnimating, setIsUpvoteAnimating] = useState(false);
  const [isDownvoteAnimating, setIsDownvoteAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpvote = () => {
    setIsUpvoteAnimating(true);
    onUpvote(id);
    setTimeout(() => setIsUpvoteAnimating(false), 1000);
  };

  const handleDownvote = () => {
    setIsDownvoteAnimating(true);
    onDownvote(id);
    setTimeout(() => setIsDownvoteAnimating(false), 1000);
  };

  return (
    <Card
      className={cn(
        "w-full max-w-[350px] h-[180px] bg-card relative transition-all duration-300 mb-12",
        isHovered ? "shadow-lg scale-[1.02] rotate-1" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-2 -right-2 animate-bounce text-xl">
          💡
        </div>
      )}
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <p className="text-lg font-medium mb-2 line-clamp-3 transition-colors duration-300">
            {excuse}
          </p>
          <p className="text-sm text-muted-foreground">- {author}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center mt-2 ">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1 transition-all duration-300",
              isUpvoteAnimating
                ? "bg-orange-100 dark:bg-orange-900/30 scale-110"
                : ""
            )}
            onClick={handleUpvote}
          >
            <Flame
              className={cn(
                "h-4 w-4 text-orange-500 transition-all",
                isUpvoteAnimating ? "animate-ping text-orange-600" : ""
              )}
            />
            <span className={isUpvoteAnimating ? "font-bold" : ""}>
              {upvotes}
            </span>
            {isUpvoteAnimating && (
              <span className="absolute -top-2 -right-2 text-xs animate-ping">
                🔥
              </span>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1 transition-all duration-300",
              isDownvoteAnimating
                ? "bg-purple-100 dark:bg-purple-900/30 scale-110"
                : ""
            )}
            onClick={handleDownvote}
          >
            <ThumbsDown
              className={cn(
                "h-4 w-4 text-purple-500 transition-all",
                isDownvoteAnimating ? "animate-ping text-purple-600" : ""
              )}
            />
            <span className={isDownvoteAnimating ? "font-bold" : ""}>
              {downvotes}
            </span>
            {isDownvoteAnimating && (
              <span className="absolute -top-2 -right-2 text-xs animate-ping">
                🤡
              </span>
            )}
          </Button>
        </div>
        <div
          className={cn(
            "text-sm transition-all duration-300",
            upvotes - downvotes > 0
              ? "text-green-500 font-medium"
              : "text-muted-foreground"
          )}
        >
          Score: {upvotes - downvotes}
          {upvotes - downvotes > 50 && (
            <span className="ml-1 animate-pulse">🏆</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExcuseCard;
