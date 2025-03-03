### Step 1: Set Up Blog Content API Endpoint
```text
- Build: Create /api/posts route fetching from blog CMS with API key
- Outcome: GET /api/posts returns 5 latest posts in BlogPost[] format
```

### Step 2: Display Latest Post Excerpt
```text
- Build: Frame landing page showing first post's 280-char excerpt + "..."
- Outcome: Frame displays latest post's title, excerpt, and static image
```

### Step 3: Implement Post Navigation & State
```text
- Build: "Next Post" button with URL-encoded state tracking currentPost index
- Outcome: Clicking cycles through posts and preserves position via URL param
```

### Step 4: Create Comment Input Interface
```text
- Build: Text input with 300-char limit and submit button
- Outcome: Input validation works and draft comment persists during navigation
```

### Step 5: Integrate Degen Points Reward
```text
- Build: Call Degen API on comment submission with wallet address
- Outcome: Successful comment adds 10 points via API (verify network request)
```

### Step 6: Add Error Recovery UX
```text
- Build: Error boundary showing retry button when API calls fail
- Outcome: Simulated API failure displays error image and retry flow works
```

### Step 7: Implement Subscription Toggle
```text
- Build: "Subscribe" button updating state.subscribed flag
- Outcome: State persists through navigation cycles (verify via URL decoding)
```

### Step 8: Build Post List Carousel
```text
- Build: Horizontal scroll container with post cards (60% width)
- Outcome: Swipe navigates between post previews, "View Post" updates main view
```

### Step 9: Add Share Deeplink Generation
```text
- Build: "📡 Share" button creating cast deeplink with post ID
- Outcome: Share button produces valid farcaster://... URL with post context
```

### Step 10: Secure API Integrations
```text
- Build: Environment variable setup for API keys + IPFS gateway
- Outcome: Production build succeeds with .env.local values in deployment
```