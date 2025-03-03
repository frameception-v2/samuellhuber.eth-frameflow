### 1. Core Functionality
**Main User Flow**  
1. User opens frame showing latest blog post excerpt  
2. Navigation buttons: "Read More", "Next Post", "Subscribe"  
3. Interactive comment section with text input  
4. Reward system for engagement using Degen API points  

**Required API Endpoints**  
```typescript
// Data structures
type BlogPost = {
  id: string
  title: string
  excerpt: string 
  content: string
  date: Date
  comments: Comment[]
}

type Comment = {
  id: string
  postId: string
  author: string // Farcaster username
  content: string
  timestamp: Date
}
```

### 2. Implementation Approach
**Frame Structure**  
```
Screens:
1. Post List (60% width)
   - Scrollable card carousel
   - Button: "View Post" (post_id in state)

2. Post Detail 
   - Featured image (IPFS CID)
   - Text: 280 char excerpt + "..." 
   - Buttons: 
     • "💬 Comment" (opens input)
     • "➡ Next Post"
     • "📡 Share" (generates cast deeplink)

3. Comment Input
   - Text input field
   - Character counter (using Farcaster 300char limit)
   - Submit button (stores in temporary PGP-signed storage)
```

**State Management**  
```typescript
// URL-encoded frame state
type FrameState = {
  currentPost: number // Index in posts array
  commentDraft?: string
  subscribed: boolean
}

// Example state encoding
const state = base64url.encode(JSON.stringify({
  currentPost: 2,
  subscribed: true
}))
```

### 3. Technical Considerations
**API Security**  
```bash
# .env.local
BLOG_API_KEY=fc_xxxx
DEGEN_API_KEY=deg_yyyy
IPFS_GATEWAY=https://mygateway.xyz
```

**Critical Error Handling**  
```typescript
// Error recovery flow
async function handlePostFetch() {
  try {
    const res = await fetch('/api/posts')
    if (!res.ok) throw new Error('Failed to load posts')
    return await res.json()
  } catch (error) {
    return {
      errorFrame: {
        image: "Error fetching content. Tap to retry",
        buttons: [{ action: 'post', label: 'Retry' }]
      }
    }
  }
}
```

### Key Integration Points
1. **Blog Content API**  
```typescript
// pages/api/posts.ts
export async function GET() {
  const posts = await fetchBlogCMS({
    apiKey: process.env.BLOG_API_KEY,
    limit: 5
  })
  return new Response(JSON.stringify(posts))
}
```

2. **Degen Points System**  
```typescript
// After successful comment submission
await fetch('https://api.degen.tips/liquidity-mining/season5/points', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.DEGEN_API_KEY}`
  },
  body: JSON.stringify({
    wallet: userAddress,
    points: 10 // Engagement reward
  })
})
```

This spec implements a content-focused frame with:  
1. Scrollable post navigation  
2. On-chain interaction tracking via Degen API  
3. State preservation through URL-safe encoding  
4. Error recovery UX patterns  
5. Wallet-based rewards integration  

The implementation uses 3 core API endpoints and maintains compatibility with Farcaster's stateless frame model through encoded URL parameters.