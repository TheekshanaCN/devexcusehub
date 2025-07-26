"use client";

import React, { useState, useEffect } from "react";
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
  category: string;
}

interface Category {
  id: number;
  name: string;
}

const ExcuseSubmissionForm = ({
  onSubmit = () => {},
}: ExcuseSubmissionFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  // ✅ Use mock category data
  useEffect(() => {
    const mockCategories = [
      { id: 1, name: "general" },
      { id: 2, name: "frontend" },
      { id: 3, name: "backend" },
      { id: 4, name: "devops" },
      { id: 5, name: "management" },
    ];
    setCategories(mockCategories);
  }, []);

  const form = useForm<ExcuseFormData>({
    defaultValues: {
      excuse: "",
      author: "",
      category: "general",
    },
  });

  // ✅ Simulate fake submission
  const handleSubmit = async (data: ExcuseFormData) => {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Simulated excuse submitted:", data);
      onSubmit(data);
      form.reset();
      toast({
        title: "🎉 Success!",
        description: (
          <div className="flex items-center gap-2">
            <span className="animate-bounce inline-block">🚀</span>
            <span>Your excuse has been submitted (mocked)!</span>
            <span className="animate-bounce inline-block delay-100">👏</span>
          </div>
        ),
      });
      setIsSubmitting(false);
    }, 1500);
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

          <FormField
            control={form.control}
            name="category"
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    {...field}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </option>
                    ))}
                  </select>
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
