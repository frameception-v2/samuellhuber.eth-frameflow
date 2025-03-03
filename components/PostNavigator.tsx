"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostNavigator({ currentIndex }: { currentIndex: number }) {
  const router = useRouter();
  
  // Cycle through 0-4 posts using modulo
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % 5;
    // Update URL without reloading page
    router.push(`/?post=${newIndex}`, undefined, { shallow: true });
  };

  return (
    <button 
      onClick={handleNext}
      className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
    >
      Next Post →
    </button>
  );
}
