import type { NextApiRequest, NextApiResponse } from 'next';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogPost[]>) {
  try {
    const response = await fetch('https://cms.example.com/posts?limit=5', {
      headers: { 'X-API-KEY': process.env.CMS_API_KEY || '' }
    });

    if (!response.ok) {
      throw new Error(`CMS request failed: ${response.status}`);
    }

    const posts: BlogPost[] = await response.json();
    
    // Ensure we only return max 5 posts and valid structure
    const filteredPosts = posts.slice(0, 5).map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    }));

    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error('API Error:', error);
    // Return empty array to maintain response shape
    res.status(500).json([]);
  }
}
