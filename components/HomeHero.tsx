"use client";

import Image from "next/image";
import { BlogPost } from "~/lib/types";

export default function HomeHero({ post }: { post: BlogPost }) {
  // Simple truncation that breaks at word boundary near 280 chars
  const truncateText = (text: string) => {
    if (text.length <= 280) return text;
    return text.substring(0, 280).replace(/\s+\S*$/, "...");
  };

  return (
    <section className="mb-8 relative">
      <div className="relative h-64 w-full">
        <Image
          src="/images/blog-static.jpg" // Moved to public/images
          alt="Blog header"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-300">
        {truncateText(post.content)}
      </p>
    </section>
  );
}
