# ShopMaster: The Ultimate Shop Inventory & Finance Tracker

This blueprint outlines the architecture, tech stack, and roadmap for **ShopMaster**, a professional Expo-based application designed for small business owners to track inventory, finances, and physical product locations.

---

## 1. Product Vision & Strategy

### The Problem
Small shop owners struggle to track investment vs. profit, manage stock levels, and help new staff find items and prices in a crowded physical space.

### The Solution
A cross-platform mobile app (Expo) that combines:
1.  **Inventory Management:** Real-time tracking of goods with barcode scanning.
2.  **Financial Intelligence:** Automated profit/loss calculation and tax-ready metrics.
3.  **Indoor Mapping:** A "Wall/Shelf" mapping system to locate products physically.
4.  **Staff Enablement:** A simplified mode for staff to check prices and locations.

---

## 2. Technical Stack & Architecture

### Core Tech Stack
*   **Framework:** [Expo SDK 51+](https://expo.dev/) (React Native).
*   **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing).
*   **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage).
*   **State Management:** 
    *   **Server State:** [TanStack Query](https://tanstack.com/query/latest) (Caching, Sync, Loading states).
    *   **Client State:** [Zustand](https://github.com/pmndrs/zustand) (UI preferences, theme).
*   **Form Management:** React Hook Form + [Zod](https://zod.dev/) (Strict validation).
*   **Styling:** [Tamagui](https://tamagui.dev/) or Nativewind (Tailwind for React Native) for professional, performant UI.
*   **Offline Support:** [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) for local caching + TanStack Query persistent storage.

### Architecture: Feature-Based Structure
```text
src/
├── app/                  # Expo Router entry points
├── components/           # Common UI components (Buttons, Inputs, etc.)
├── features/             # Business logic grouped by feature
│   ├── inventory/        # Stock management, Barcode scanning
│   ├── analytics/        # Profit/Loss charts, Metrics
│   ├── mapping/          # Indoor physical location logic
│   └── sales/            # POS Lite, transaction logging
├── hooks/                # Global custom hooks
├── services/             # API clients (Supabase, external)
├── store/                # Zustand stores
├── utils/                # Helper functions (Currency, Date)
└── theme/                # Design system configuration
```

---

## 3. Database Schema (Supabase)

### Tables
1.  **`profiles`**: User data, role (`owner` | `staff`).
2.  **`products`**: `id`, `name`, `sku`, `barcode`, `buying_price`, `selling_price`, `min_stock_level`.
3.  **`locations`**: `id`, `name` (e.g., "Wall A", "Shelf 3"), `image_url` (optional).
4.  **`product_locations`**: Links products to physical spots.
5.  **`stock_logs`**: History of stock added (for investment tracking).
6.  **`sales_logs`**: History of items sold (for profit/loss tracking).

---

## 4. Implementation Roadmap

### Phase 1: Foundation (MVP)
*   **Setup:** Initialize Expo project, Supabase, and basic routing.
*   **Auth:** Login/Register with Role-Based Access Control.
*   **Inventory CRUD:** Basic list/add/edit for products.
*   **Barcode Scanning:** Integrated camera scanner for product lookup.

### Phase 2: Location & Staff Mode
*   **Indoor Mapping:** UI to create locations and assign products to them.
*   **Search Engine:** Instant search by name or barcode for staff price-checking.
*   **Optimistic UI:** Ensure the app feels "instant" even on slow networks.

### Phase 3: Finance & Analytics
*   **POS Lite:** Simple "Sell" button to log a transaction.
*   **Dashboard:** High-level metrics (Total Investment, Expected Profit, Realized Profit).
*   **Stock Alerts:** Push notifications for low stock.

### Phase 4: Offline & Polish
*   **Local Caching:** Full offline read/write support using SQLite.
*   **Reporting:** Export sales/stock data to CSV/PDF.
*   **Dark Mode & Theming:** Professional look and feel.

---

## 5. Technical Implementation Guide (Deep Dive)

### 5.1. Authentication & Authorization
*   **Strategy:** Supabase Auth with JWT.
*   **RBAC:** The `profiles` table contains a `role` column. Use a custom hook `useRole()` to gate UI elements (e.g., hiding the "Investment" tab from staff).
*   **RLS Policies:** 
    ```sql
    CREATE POLICY "Users can only see their own shop data" 
    ON public.products 
    FOR ALL 
    USING (auth.uid() = user_id);
    ```

### 5.2. State Management Pattern
*   **Server State (TanStack Query):** Use for all Supabase calls. Implement `onSuccess` callbacks to invalidate related queries (e.g., invalidating `products` after a `sale_log` is created).
*   **Persistent Client State (Zustand + Persist):** Store the user's current session, local settings, and an "Offline Sync Queue."

### 5.3. Offline-First Strategy
*   **Mechanism:** Use `expo-sqlite` as the local "source of truth" when internet is absent.
*   **Sync Logic:** TanStack Query's `onlineManager` detects connectivity. Use a background task to "drain" the sync queue (POSTing local changes to Supabase) once the connection is restored.

---

## 6. Senior Developer Best Practices
1.  **Type Safety:** 100% TypeScript coverage. Use Supabase CLI to generate types.
2.  **Performance:** Memoize expensive calculations (e.g., profit totals) with `useMemo`.
3.  **Security:** Implement Supabase Row Level Security (RLS) to ensure users only see their own shop data.
4.  **Testing:** Unit tests for financial calculations; integration tests for the "Sell" flow.
