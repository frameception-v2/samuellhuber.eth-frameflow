"use client";

import { useEffect, useState } from "react";
import { PurpleButton } from "./ui/PurpleButton";

export default function CommentInput() {
  // Load initial comment from localStorage or empty string
  const [comment, setComment] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('draftComment') || '';
    }
    return '';
  });

  // Persist draft to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('draftComment', comment);
    }
  }, [comment]);

  const handleSubmit = () => {
    if (comment.length > 0 && comment.length <= 300) {
      // TODO: Implement actual submission logic
      console.log("Submitting comment:", comment);
    }
  };

  const isValid = comment.length > 0 && comment.length <= 300;

  return (
    <div className="space-y-2">
      <textarea
        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        placeholder="Write your comment..."
        maxLength={300}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {comment.length}/300
        </span>
        <PurpleButton 
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Post Comment
        </PurpleButton>
      </div>
    </div>
  );
}
