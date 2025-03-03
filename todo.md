Here's the executable task list following your specifications:

- [x] Task 1: Create blog API route
  File: pages/api/posts.ts
  Action: Create new API route
  Description: Fetch 5 latest posts from CMS
  ```typescript
  import type { NextApiRequest, NextApiResponse } from 'next';
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch('https://cms.example.com/posts?limit=5', {
      headers: { 'X-API-KEY': process.env.CMS_API_KEY }
    });
    const posts: BlogPost[] = await response.json();
    res.status(200).json(posts);
  }
  ```
  API Endpoint: GET /api/posts
  Criteria: Returns array of 5 blog posts

- [x] Task 2: Add post excerpt to landing page
  File: components/HomeHero.tsx
  Action: Create new component
  Description: Display latest post excerpt
  ```tsx
  export default function HomeHero({ post }: { post: BlogPost }) {
    return (
      <section>
        <h1>{post.title}</h1>
        <img src="/blog-static.jpg" alt="Blog header" />
        <p>{post.content.substring(0, 280)}...</p>
      </section>
    );
  }
  ```
  Criteria: Visible excerpt with truncation and static image

- [x] Task 3: Implement post navigation
  File: components/PostNavigator.tsx
  Action: Create new component
  Description: Next button with URL state
  ```tsx
  export default function PostNavigator({ currentIndex }: { currentIndex: number }) {
    const router = useRouter();
    
    const handleNext = () => {
      const newIndex = (currentIndex + 1) % 5;
      router.push(`/?post=${newIndex}`, undefined, { shallow: true });
    };

    return <button onClick={handleNext}>Next Post →</button>;
  }
  ```
  Criteria: URL updates with post index on click

- [ ] Task 4: Create comment input
  File: components/CommentInput.tsx
  Action: Create new component
  Description: Persisted draft comment
  ```tsx
  export default function CommentInput() {
    const [comment, setComment] = useState(() => {
      return localStorage.getItem('draftComment') || '';
    });

    const handleSubmit = () => {
      if (comment.length > 0 && comment.length <= 300) {
        // Submit logic
      }
    };

    return (
      <div>
        <textarea 
          maxLength={300}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmit}>Post Comment</button>
      </div>
    );
  }
  ```
  Criteria: Input validation and draft persistence

- [ ] Task 5: Integrate Degen API
  File: services/degen.ts
  Action: Create new service
  Description: Reward points on comment
  ```typescript
  export async function rewardPoints(walletAddress: string) {
    const response = await fetch('https://api.degen.org/rewards', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEGEN_API_KEY}`
      },
      body: JSON.stringify({ address: walletAddress, points: 10 })
    });
    return response.json();
  }
  ```
  Criteria: Network request visible in dev tools

- [ ] Task 6: Create error boundary
  File: components/ErrorFallback.tsx
  Action: Create new component
  Description: API error recovery
  ```tsx
  export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return (
          <div>
            <img src="/error.png" alt="Error" />
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        );
      }
      return this.props.children;
    }
  }
  ```
  Criteria: Error state visible on forced API failure

- [ ] Task 7: Add subscription toggle
  File: components/Header.tsx
  Action: Modify existing component
  Description: Persist subscription state
  ```tsx
  export default function Header() {
    const [subscribed, setSubscribed] = useState(false);
    const router = useRouter();

    const handleSubscribe = () => {
      const newState = !subscribed;
      setSubscribed(newState);
      router.push(`/?subscribed=${newState}`, undefined, { shallow: true });
    };

    return <button onClick={handleSubscribe}>
      {subscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>;
  }
  ```
  Criteria: URL param persists after navigation

- [ ] Task 8: Build post carousel
  File: components/PostCarousel.tsx
  Action: Create new component
  Description: Horizontal post previews
  ```tsx
  export default function PostCarousel({ posts }: { posts: BlogPost[] }) {
    return (
      <div className="overflow-x-scroll flex gap-4">
        {posts.map(post => (
          <div key={post.id} className="w-[60%] flex-shrink-0">
            <h3>{post.title}</h3>
            <button onClick={() => router.push(`/post/${post.id}`)}>
              View Post
            </button>
          </div>
        ))}
      </div>
    );
  }
  ```
  Criteria: Horizontal scrolling works

- [ ] Task 9: Add share deeplink
  File: components/ShareButton.tsx
  Action: Create new component
  Description: Generate Farcaster link
  ```tsx
  export default function ShareButton({ postId }: { postId: string }) {
    const handleShare = () => {
      const deeplink = `farcaster://casts/${postId}`;
      navigator.clipboard.writeText(deeplink);
    };

    return <button onClick={handleShare}>📡 Share</button>;
  }
  ```
  Criteria: Button produces valid URL format

- [ ] Task 10: Configure environment
  File: .env.local
  Action: Create new file
  Description: Secure API credentials
  ```env
  CMS_API_KEY=your_cms_key_here
  DEGEN_API_KEY=your_degen_key_here
  IPFS_GATEWAY=https://ipfs.io/ipfs/
  ```
  Criteria: Build completes without env errors

Tasks are ordered by implementation sequence and include specific file references, code snippets, and verification criteria as requested.
