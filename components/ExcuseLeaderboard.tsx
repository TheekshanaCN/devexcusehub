import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Flame,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import ExcuseCard from "@/components/ExcuseCard";
import { useToast } from "@/components/ui/use-toast";

interface Excuse {
  id: string;
  excuse: string;
  author: string;
  upvotes: number;
  downvotes: number;
  score?: number;
}

interface ExcuseLeaderboardProps {
  className?: string;
}

// Mock data for excuses
const MOCK_EXCUSES: Excuse[] = [
  {
    id: "1",
    excuse: "My dog ate my homework... literally this time!",
    author: "student123",
    upvotes: 42,
    downvotes: 3,
  },
  {
    id: "2",
    excuse: "I was abducted by aliens and they wiped my memory of the task.",
    author: "xfilesfan",
    upvotes: 35,
    downvotes: 8,
  },
  {
    id: "3",
    excuse: "I was too busy saving the world from an alien invasion.",
    author: "superhero",
    upvotes: 28,
    downvotes: 12,
  },
  {
    id: "4",
    excuse: "My internet was down because squirrels chewed through the cable.",
    author: "techissues",
    upvotes: 25,
    downvotes: 5,
  },
  {
    id: "5",
    excuse: "I was stuck in a time loop reliving the same day.",
    author: "groundhogday",
    upvotes: 20,
    downvotes: 15,
  },
  {
    id: "6",
    excuse: "My cat walked across my keyboard and deleted everything.",
    author: "catlover",
    upvotes: 18,
    downvotes: 2,
  },
  {
    id: "7",
    excuse: "I was busy fighting a dragon in my backyard.",
    author: "fantasyfan",
    upvotes: 15,
    downvotes: 10,
  },
  {
    id: "8",
    excuse: "I was learning to code and accidentally hacked into the Pentagon.",
    author: "hacker",
    upvotes: 12,
    downvotes: 8,
  },
  {
    id: "9",
    excuse: "I was busy inventing a new color.",
    author: "artist",
    upvotes: 10,
    downvotes: 6,
  },
  {
    id: "10",
    excuse: "I was training for the zombie apocalypse.",
    author: "prepper",
    upvotes: 8,
    downvotes: 4,
  },
];

const ExcuseLeaderboard = ({ className = "" }: ExcuseLeaderboardProps) => {
  const [excuses, setExcuses] = useState<Excuse[]>([]);
  const [topExcuses, setTopExcuses] = useState<Excuse[]>([]);
  const [controversialExcuses, setControversialExcuses] = useState<Excuse[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"upvotes" | "downvotes" | "score">(
    "upvotes",
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalExcuses, setTotalExcuses] = useState<number>(MOCK_EXCUSES.length);
  const itemsPerPage = 6;
  const { toast } = useToast();

  useEffect(() => {
    fetchExcuses();
    fetchTopExcuses();
    fetchControversialExcuses();
  }, [sortBy, currentPage]);

  // Helper function to calculate score (upvotes - downvotes)
  const calculateScore = (excuse: Excuse) => {
    return excuse.upvotes - excuse.downvotes;
  };

  const fetchExcuses = () => {
    setLoading(true);
    try {
      // Sort the mock data based on the current sortBy
      let sortedExcuses = [...MOCK_EXCUSES];
      
      if (sortBy === "upvotes") {
        sortedExcuses.sort((a, b) => b.upvotes - a.upvotes);
      } else if (sortBy === "downvotes") {
        sortedExcuses.sort((a, b) => b.downvotes - a.downvotes);
      } else if (sortBy === "score") {
        sortedExcuses.sort((a, b) => calculateScore(b) - calculateScore(a));
      }

      // Paginate the results
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedExcuses = sortedExcuses.slice(startIndex, endIndex);

      setExcuses(paginatedExcuses);
    } catch (error) {
      console.error("Error fetching excuses:", error);
      toast({
        title: "Error",
        description: "Failed to load excuses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTopExcuses = () => {
    try {
      // Get top 10 by upvotes
      const sorted = [...MOCK_EXCUSES].sort((a, b) => b.upvotes - a.upvotes);
      setTopExcuses(sorted.slice(0, 10));
    } catch (error) {
      console.error("Error fetching top excuses:", error);
    }
  };

  const fetchControversialExcuses = () => {
    try {
      // Get most controversial (highest sum of upvotes and downvotes)
      const sorted = [...MOCK_EXCUSES].sort(
        (a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes),
      );
      setControversialExcuses(sorted.slice(0, 10));
    } catch (error) {
      console.error("Error fetching controversial excuses:", error);
    }
  };

  const handleUpvote = async (id: string) => {
    try {
      // Find the excuse and increment upvotes
      const updatedExcuses = MOCK_EXCUSES.map(excuse => 
        excuse.id === id ? { ...excuse, upvotes: excuse.upvotes + 1 } : excuse
      );
      
      // Update state with the new data
      fetchExcuses();
      fetchTopExcuses();
      fetchControversialExcuses();
      
      toast({
        title: "Success",
        description: "Upvote recorded!",
      });
    } catch (error) {
      console.error(`Error upvoting excuse with id: ${id}`, error);
      toast({
        title: "Error",
        description: "Failed to upvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownvote = async (id: string) => {
    try {
      // Find the excuse and increment downvotes
      const updatedExcuses = MOCK_EXCUSES.map(excuse => 
        excuse.id === id ? { ...excuse, downvotes: excuse.downvotes + 1 } : excuse
      );
      
      // Update state with the new data
      fetchExcuses();
      fetchTopExcuses();
      fetchControversialExcuses();
      
      toast({
        title: "Success",
        description: "Downvote recorded!",
      });
    } catch (error) {
      console.error(`Error downvoting excuse with id: ${id}`, error);
      toast({
        title: "Error",
        description: "Failed to downvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalExcuses / itemsPerPage);

  const renderPagination = () => {
    return (
      <div className="flex items-center justify-center mt-8 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 p-0 transition-all duration-300 ${currentPage === page ? "scale-110" : "hover:scale-105"}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div
      className={`w-full max-w-[1200px] mx-auto bg-background p-6 rounded-lg shadow-sm ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold group flex items-center gap-2">
          <span className="inline-block animate-bounce">🏆</span>
          <span>Excuse Leaderboard</span>
          <span className="inline-block animate-pulse">📊</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "upvotes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("upvotes")}
            className={`flex items-center gap-1 transition-all duration-300 ${sortBy === "upvotes" ? "scale-110" : "hover:scale-105"}`}
          >
            <Flame
              className={`h-4 w-4 ${sortBy === "upvotes" ? "animate-pulse text-orange-500" : ""}`}
            />
            <span>Upvotes</span>
            <span className={`${sortBy === "upvotes" ? "animate-ping" : ""}`}>
              🔥
            </span>
          </Button>
          <Button
            variant={sortBy === "downvotes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("downvotes")}
            className={`flex items-center gap-1 transition-all duration-300 ${sortBy === "downvotes" ? "scale-110" : "hover:scale-105"}`}
          >
            <ThumbsDown
              className={`h-4 w-4 ${sortBy === "downvotes" ? "animate-pulse text-purple-500" : ""}`}
            />
            <span>Downvotes</span>
            <span className={`${sortBy === "downvotes" ? "animate-ping" : ""}`}>
              👎
            </span>
          </Button>
          <Button
            variant={sortBy === "score" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("score")}
            className={`flex items-center gap-1 transition-all duration-300 ${sortBy === "score" ? "scale-110" : "hover:scale-105"}`}
          >
            <ArrowUpDown
              className={`h-4 w-4 ${sortBy === "score" ? "animate-pulse text-yellow-500" : ""}`}
            />
            <span>Score</span>
            <span className={`${sortBy === "score" ? "animate-ping" : ""}`}>
              ⭐
            </span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger
            value="all"
            className="transition-all duration-300 hover:scale-105 group flex items-center gap-1"
          >
            <span className="group-hover:animate-spin inline-block">🌐</span>
            <span>All Excuses</span>
          </TabsTrigger>
          <TabsTrigger
            value="top"
            className="transition-all duration-300 hover:scale-105 group flex items-center gap-1"
          >
            <span className="group-hover:animate-bounce inline-block">🥇</span>
            <span>Top 10</span>
          </TabsTrigger>
          <TabsTrigger
            value="controversial"
            className="transition-all duration-300 hover:scale-105 group flex items-center gap-1"
          >
            <span className="group-hover:animate-pulse inline-block">🌶️</span>
            <span>Most Controversial</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading excuses...</span>
            </div>
          ) : excuses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No excuses found. Be the first to submit one!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {excuses.map((excuse) => (
                <ExcuseCard
                  key={excuse.id}
                  id={excuse.id}
                  excuse={excuse.excuse}
                  author={excuse.author}
                  upvotes={excuse.upvotes}
                  downvotes={excuse.downvotes}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                />
              ))}
            </div>
          )}
          {renderPagination()}
        </TabsContent>

        <TabsContent value="top" className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading top excuses...</span>
            </div>
          ) : topExcuses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No excuses found yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topExcuses.map((excuse) => (
                <ExcuseCard
                  key={excuse.id}
                  id={excuse.id}
                  excuse={excuse.excuse}
                  author={excuse.author}
                  upvotes={excuse.upvotes}
                  downvotes={excuse.downvotes}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="controversial" className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">
                Loading controversial excuses...
              </span>
            </div>
          ) : controversialExcuses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No controversial excuses found yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {controversialExcuses.map((excuse) => (
                <ExcuseCard
                  key={excuse.id}
                  id={excuse.id}
                  excuse={excuse.excuse}
                  author={excuse.author}
                  upvotes={excuse.upvotes}
                  downvotes={excuse.downvotes}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExcuseLeaderboard;