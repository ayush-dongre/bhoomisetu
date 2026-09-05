# BHOOMISETU — National Land Acquisition & Management System

Built for Smart India Hackathon 2026.

## Tech Stack
React 18 + Vite + Tailwind CSS + React Router DOM + Recharts + Lucide React.

## Run locally
```
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173).

## Build for production
```
npm run build
npm run preview
```

## Demo login
On the login screen, use "Quick demo login as" to sign in instantly as any of the 6 roles
(Central Ministry, State Nodal Officer, District Collector, Implementing Agency, Field Inspector, Citizen)
— no password needed. Or use the officer login form with any email from `src/data/users.js`
and OTP `123456`.

## What's implemented
All 25 SIH feature areas are represented with working UI, mock data, and interactions:
- Project proposal submission + multi-level approval workflow (simulated)
- Document management with categories, versions, and status
- Interactive national map (stylized SVG map — no external tile server dependency)
- Land parcel geo-tagging with survey/khasra/khatauni numbers
- 8-stage acquisition lifecycle tracker per project
- Compensation & R&R tracking with charts
- Role-based access control (6 roles, permission matrix)
- Notification center + escalation matrix
- Executive MIS reports (export simulated)
- Predictive risk scoring & delay analytics
- Multi-language switcher, high-contrast toggle, offline-mode toggle
- Help center with FAQ search + simulated chatbot + support ticket form

Some deep-integration features (Bhulekh/UIDAI/PFMS APIs, GPS photo capture, OCR, SSO)
are represented as clearly-labeled UI mocks, since they require real government backend
access that isn't available in a hackathon demo — the UI, state, and data flow are all
wired up so real APIs can be swapped in later.

## Project structure
See `src/components`, `src/pages`, `src/data` (mock backend), `src/context`, `src/hooks`.
