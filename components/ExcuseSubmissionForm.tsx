"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface ExcuseSubmissionFormProps {
  onSubmit?: (data: ExcuseFormData) => void;
}

interface ExcuseFormData {
  excuse: string;
  author: string;
}

const ExcuseSubmissionForm = ({
  onSubmit = () => {},
}: ExcuseSubmissionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ExcuseFormData>({
    defaultValues: {
      excuse: "",
      author: "",
    },
  });

  const handleSubmit = async (data: ExcuseFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          excuse: data.excuse,
          author: data.author,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit excuse");
      }

      const responseData = await response.json();

      onSubmit(data);
      form.reset();

      toast({
        title: "🎉 Success!",
        description: (
          <div className="flex items-center gap-2">
            <span className="animate-bounce inline-block">🚀</span>
            <span>Your excuse has been submitted!</span>
            <span className="animate-bounce inline-block delay-100">👏</span>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error submitting excuse:", error);
      toast({
        title: "❌ Error",
        description: "Failed to submit excuse. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-md border border-border">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📝 Submit Your Excuse 💡
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="excuse"
            rules={{ required: "An excuse is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Excuse</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="It works on my machine..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Be creative! The best excuses are both believable and absurd.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Anonymous Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full transition-all duration-300 hover:scale-105 hover:shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block">⏳</span>
                <span className="animate-pulse">Submitting...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-bounce inline-block">🚀</span>
                <span>Submit Excuse</span>
                <span className="animate-bounce inline-block delay-150">
                  ✨
                </span>
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ExcuseSubmissionForm;
