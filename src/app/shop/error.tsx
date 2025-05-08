"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-800 text-white flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h2 className="text-3xl font-bold bg-gold-gradient from-white via-gold-200 to-white bg-clip-text text-transparent">
          Something went wrong!
        </h2>
        <p className="text-zinc-400 max-w-md mx-auto">
          {error.message ||
            "An unexpected error occurred while loading the products."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="bg-gold-gradient from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white !rounded-button shadow-gold"
          >
            Try again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-gold-400 text-gold-400 hover:bg-gold-400/10 !rounded-button"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
