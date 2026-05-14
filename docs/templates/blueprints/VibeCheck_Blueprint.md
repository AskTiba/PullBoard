# VibeCheck: The Ultimate Local Discovery & Community Hub

This blueprint outlines the architecture, tech stack, and roadmap for **VibeCheck**, a discovery-first application designed to help users find the best leisure activities, dining, events, and community gatherings in their area.

---

## 1. Product Vision & Strategy

### The Problem
People often struggle to find "the right vibe" for their specific needs—whether it's a quiet spot for chess, a lively bar for a football match, or a community marathon. Existing apps are often too generic or lack real-time community "feel."

### The Solution
A map-centric discovery engine that prioritizes:
1.  **Multi-Activity Profiling:** Highlighting places that offer multiple services (e.g., a cafe with swimming and art).
2.  **Social Proof:** Authentic reviews and "vibe" ratings from the community.
3.  **Event Integration:** A unified space for sports watch parties, charity events, and local meetups.
4.  **Monetization Ready:** Built-in infrastructure for promoted listings and event ticketing.

---

## 2. Technical Stack & Architecture

### Core Tech Stack
*   **Framework:** [Expo SDK 51+](https://expo.dev/) (React Native).
*   **Maps:** [React Native Maps](https://github.com/react-native-maps/react-native-maps) + [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview).
*   **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Auth + Real-time for live events).
*   **State Management:** 
    *   **Server State:** TanStack Query (Handling complex geospatial queries).
    *   **Client State:** Zustand (Managing map filters, user location, and "saved" vibes).
*   **Styling:** [Nativewind](https://www.nativewind.dev/) (Tailwind CSS) for a modern, fluid UI.
*   **Location Services:** [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) for real-time user positioning.

### Architecture: Feature-Based Structure
```text
src/
├── app/                  # Expo Router (Map View, Place Details, Events)
├── features/
│   ├── discovery/        # Map logic, Search, Filtering
│   ├── social/           # Reviews, Ratings, Community feed
│   ├── events/           # Ticketing, Sports, Charity listings
│   └── profile/          # User preferences, Saved spots
├── hooks/                # useLocation, useNearbyPlaces
├── services/             # Supabase, Google Maps API
└── components/           # UI elements (VibeCards, MapMarkers)
```

---

## 3. Key Features

### 3.1. The "Vibe" Engine
*   **Dynamic Tagging:** Places are tagged with specific vibes (e.g., #Quiet, #FamilyFriendly, #Artistic).
*   **Activity Overlays:** See icons for all available activities at a glance (Swimming, Horse Riding, etc.).

### 3.2. Community & Events
*   **Event Hub:** Dedicated section for "What's Happening Today" (e.g., Chess Meetup @ 5 PM, Charity Car Wash).
*   **Verified Reviews:** Users can upload photos/videos to confirm the "vibe."

### 3.3. Monetization Framework
*   **Partner Dashboard:** Simple portal for business owners to promote their place or sell tickets.
*   **Premium Perks:** Digital coupons for "VibeCheck Members."

### 3.4. Creative Supplementary Features
*   **Mood-Based "Vibe Matcher":** A fun, swipeable "Tinder-style" interface where users select their current mood (e.g., "Relaxed," "Adventurous") to get instant, personalized spot recommendations.
*   **Real-Time "Crowd Meter":** A community-reported indicator showing if a place is currently #Chilled, #Active, or #Packed, helping users find the right atmosphere at that exact moment.
*   **Local "Digital Passport":** Gamified exploration where users collect digital stamps for visiting new spots, unlocking "Local Legend" status and exclusive discounts.
*   **"Table-Share" Social Tag:** A feature for solo travelers or locals to signal they are open to others joining their table for a chat, fostering community in bars and cafes.
*   **Community Quests:** Monthly themed challenges (e.g., "The Ice Cream Trail") that encourage users to visit a set of curated local businesses.

---

## 4. Database Schema (Supabase)

### Tables
1.  **`places`**: `id`, `name`, `description`, `lat`, `lng`, `address`, `contact_info`.
2.  **`activities`**: `id`, `name` (e.g., "Swimming", "Chess").
3.  **`place_activities`**: Many-to-many link between places and activities.
4.  **`events`**: `id`, `place_id`, `title`, `type` (`sports`, `charity`, `leisure`), `start_time`, `ticket_price`.
5.  **`reviews`**: `id`, `user_id`, `place_id`, `rating`, `vibe_tags` (JSONB), `comment`.

---

## 5. Implementation Roadmap

### Phase 1: The Map (MVP)
*   **Project Init:** Expo + Supabase + Maps integration.
*   **Discovery View:** A high-performance map showing nearby places and activities.
*   **Place Details:** Rich pages for each location with activity tags.

### Phase 2: Social & Reviews
*   **Auth:** User login/profiles.
*   **Review System:** Rate and tag places with "Vibes."
*   **Search/Filter:** Filter by activity (e.g., "Show me places with Pool + Art").

### Phase 3: Events & Community
*   **Event Listings:** Basic board for sports and charity events.
*   **Submission Flow:** Allow users/businesses to submit their own events.

### Phase 4: Monetization & Polish
*   **Promoted Logic:** Implement sorting algorithms to highlight featured partners.
*   **Ticketing Integration:** Basic payment flow (Stripe) for event tickets.

---

## 6. Senior Dev Best Practices
1.  **Geospatial Optimization:** Use PostGIS (via Supabase) for efficient "nearby" queries.
2.  **Asset Management:** Use Supabase Storage for high-quality place photos.
3.  **UX/UI:** Implement "Skeleton Screens" for place cards to ensure the app feels fast while images load.
