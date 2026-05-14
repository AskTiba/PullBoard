# EliteAid: The Professional Household Services Marketplace

This blueprint outlines the architecture, tech stack, and roadmap for **EliteAid**, a trust-first platform connecting homeowners with verified, professional household helpers.

---

## 1. Product Vision & Strategy

### The Problem
The household help industry lacks professional standards, leading to inconsistent service quality for homeowners and financial/personal vulnerability for helpers.

### The Solution
A secure, performance-driven marketplace that provides:
1.  **Verified Professionalism:** A vetting and rating system that rewards skill and reliability.
2.  **Financial Protection:** Escrow-style payments to ensure fair pay for helpers and guaranteed results for owners.
3.  **Well-being Infrastructure:** Tools for helpers to manage their health, safety, and employment rights.
4.  **Accountability:** A transparent dispute resolution system and review integrity checks.

---

## 2. Technical Stack & Architecture

### Core Tech Stack
*   **Framework:** [Expo SDK 51+](https://expo.dev/) (React Native).
*   **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage).
*   **Payments:** [Stripe Connect](https://stripe.com/connect) (Essential for Escrow and multi-party payouts).
*   **State Management:** 
    *   **Server State:** TanStack Query (Real-time booking updates).
    *   **Client State:** Zustand (Multi-step booking forms, user preferences).
*   **Notifications:** [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) (Critical for emergency alerts and payment reminders).

### Architecture: Feature-Based Structure
```text
src/
├── app/                  # Expo Router (Client/Helper Dashboards, Bookings)
├── features/
│   ├── marketplace/      # Searching, Filtering, Profiles
│   ├── payments/         # Escrow logic, Stripe integration
│   ├── safety/           # SOS button, Well-being logs, Disputes
│   └── jobs/             # Task specification, Booking lifecycle
├── hooks/                # useAuth, useEscrow, useSOS
├── services/             # Supabase, Stripe API
└── components/           # UI elements (JobCards, HelperProfiles, SafetyModals)
```

---

## 3. Key Features & Protection Systems

### 3.1. The Trust Loop
*   **Escrow-Style Payments:** Owners deposit funds when booking; EliteAid holds the funds and releases them once the task is marked "Complete" and "Approved."
*   **Performance-Linked Pay:** Higher ratings unlock higher pay-scale brackets, motivating helpers to maintain excellence.

### 3.2. Helper Well-being & Safety
*   **SOS/Safety Button:** A prominent button in the Helper UI that alerts EliteAid support and/or local emergency contacts if triggered during a job.
*   **Well-being Dashboard:** Helpers can log sick days, report mistreatment, or request contract termination through a formal, tracked process.
*   **Vetting Process:** Mandatory background checks and skill verification (potentially via third-party agencies).

### 3.3. Review Integrity
*   **Two-Way Reviews:** Helpers also rate owners (protecting against "bad" employers).
*   **Verified Review Logic:** Only users who have completed a transaction can leave a review.

### 3.4. Creative Supplementary Features
*   **Skill Badges & Micro-Certifications:** Helpers earn digital badges (e.g., #GourmetCooking, #DeepCleaning, #Childcare) based on consistently high ratings in specific task categories.
*   **Career Path Dashboard:** A motivation tool for helpers that visualizes their journey from "Junior" to "Elite" status, showing exactly how many jobs or ratings are needed for the next pay-tier upgrade.
*   **Smart Task Templates:** Pre-filled "Professional Checklists" for homeowners (e.g., "Holiday Prep," "Post-Party Cleanup") to ensure all expectations are clearly communicated from the start.
*   **"Trial Run" Tasks:** A specialized category for short, 1-2 hour tasks that allow homeowners and helpers to test compatibility before committing to recurring or long-term employment.
*   **Helper Support Community:** A private, moderated in-app space where verified helpers can share tips, professional advice, and support each other's well-being.
*   **Peace-of-Mind Subscription:** An optional premium tier for homeowners that offers priority dispute resolution, instant background-checked replacements for sick days, and monthly "Quality Audits."

---

## 4. Database Schema (Supabase)

### Tables
1.  **`profiles`**: `id`, `name`, `user_type` (`owner` | `helper`), `verification_status`.
2.  **`helper_stats`**: `id`, `helper_id`, `total_jobs`, `avg_rating`, `pay_tier`.
3.  **`tasks`**: `id`, `owner_id`, `helper_id`, `description`, `status` (`pending`, `escrowed`, `active`, `completed`, `disputed`), `amount`.
4.  **`safety_alerts`**: `id`, `task_id`, `helper_id`, `timestamp`, `severity`.
5.  **`wellbeing_logs`**: `id`, `helper_id`, `type` (`sick`, `emergency`, `termination`), `status`.

---

## 5. Implementation Roadmap

### Phase 1: Foundation (Trust)
*   **Project Init:** Expo + Supabase.
*   **Multi-Role Auth:** Specialized onboarding flows for Owners and Helpers.
*   **Profile Verification:** Admin dashboard for vetting helpers.

### Phase 2: Booking & Escrow
*   **Job Creation:** UI for owners to specify chores and requirements.
*   **Stripe Integration:** Basic "Deposit to Escrow" flow.
*   **Job Lifecycle:** State management for accepting, starting, and finishing tasks.

### Phase 3: Safety & Well-being
*   **SOS Feature:** Real-time alerting system.
*   **Dispute Hub:** UI for both parties to submit evidence in case of performance/pay issues.
*   **Well-being Portal:** Simple logging for helpers to report health or treatment issues.

### Phase 4: Scaling & Analytics
*   **Dynamic Pay-Tiering:** Logic to automatically adjust helper pay ranges based on performance data.
*   **Reporting:** Monthly earnings/performance reports for helpers.

---

## 6. Senior Dev Best Practices
1.  **Security:** Use RLS to ensure owners cannot see helper well-being logs unless explicitly shared.
2.  **Reliability:** Implement heavy error handling for payment flows.
3.  **Audit Logs:** Track every status change in a `tasks` record for dispute evidence.
