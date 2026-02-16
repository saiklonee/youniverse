# Youniverse Implementation Checklist

## 1. Project Initialization & Setup

- [x] **Repository Setup**
  - [x] Initialize Git repository
  - [x] Create `.gitignore` (node_modules, .env, etc.)
  - [x] Create `README.md`
- [x] **Backend Setup (Server)**
  - [x] Initialize `server/` directory with `package.json`
  - [x] Install dependencies: `express`, `mongoose`, `dotenv`, `cors`, `cookie-parser`
  - [x] Set up `server/server.js` basic server
  - [x] Configure database connection (`server/configs/db.js`) to MongoDB Atlas
  - [x] Set up folder structure: `models`, `routes`, `controllers`, `middlewares`, `utils`
- [x] **Frontend Setup (Client)**
  - [x] Initialize `client/` (or root) with Vite (React)
  - [x] Install dependencies: `react-router-dom`, `axios`, `redux-toolkit` (or `react-query`), `tailwindcss`, `lucide-react` (icons)
  - [x] Configure Tailwind CSS (colors from Design Doc: Soft Indigo, Muted Green, etc.)
  - [x] Set up folder structure: `features`, `layouts`, `components`, `pages`
  - [x] Configure `axios` instance with base URL and credentials (cookies)

## 2. Authentication Module

- [ ] **Backend (Auth)**
  - [ ] Create `User` model (`name`, `email`, `passwordHash`, `timezone`)
  - [ ] Implement `register` controller (hash password with `bcrypt`)
  - [ ] Implement `login` controller (generate JWT, set HTTP-only cookie)
  - [ ] Implement `logout` controller (clear cookie)
  - [ ] Create `authMiddleware` to protect routes
  - [ ] Create Auth routes (`/api/auth/register`, `/login`, `/logout`, `/me`)
- [ ] **Frontend (Auth)**
  - [ ] Design Login Page (centered card, minimal)
  - [ ] Design Signup Page
  - [ ] Integrate Auth API (Login/Signup forms)
  - [ ] Create `AuthProvider` or Redux slice to manage user state
  - [ ] Create `ProtectedRoute` component for private pages

## 3. App Shell & Navigation

- [ ] **Layout Components**
  - [ ] Create `Sidebar` component (collapsible, navigation links)
  - [ ] Create `TopBar` component (Month selector, Search, User dropdown)
  - [ ] Create `MainLayout` (combines Sidebar, TopBar, and Content)
- [ ] **Routing**
  - [ ] Set up React Router
  - [ ] Define routes: `/`, `/sleep`, `/mood`, `/closet`, `/docs`, `/profile`

## 4. Dashboard (Home)

- [ ] **UI Implementation**
  - [ ] Design logical grid layout for widget cards
  - [ ] Create `SleepSummaryCard` (last 7 days avg)
  - [ ] Create `MoodSummaryCard` (weekly trend)
  - [ ] Create `ClosetSummaryCard` (total items)
  - [ ] Create `DocsSummaryCard` (expiring soon)
- [ ] **Data Integration**
  - [ ] Create `/api/dashboard/stats` endpoint (aggregates data from all modules)
  - [ ] Fetch and display data on Dashboard cards

## 5. Sleep Tracker (Phase 1 Priority)

- [ ] **Backend (Sleep)**
  - [ ] Create `SleepDay` model (`userId`, `date`, `segments`, `quality`, `notes`)
  - [ ] Create composite index on `userId` + `date`
  - [ ] Implement CRUD controllers: `getMonthlySleep`, `addSleepEntry`, `updateSleepEntry`, `deleteSleepEntry`
- [ ] **Frontend (Sleep)**
  - [ ] Implement `MonthView` (calendar grid/list)
  - [ ] Build `DayRow` component (24h horizontal timeline visualization)
  - [ ] Implement `SleepModal` (Add/Edit start/end time, quality, notes)
  - [ ] Integrate Sleep API
- [ ] **Analytics (Sleep)**
  - [ ] Calculate monthly averages and streaks
  - [ ] Display visual bar chart (using Recharts/Chart.js)

## 6. Mood Tracker

- [ ] **Backend (Mood)**
  - [ ] Create `MoodEntry` model (`userId`, `date`, `moodScore`, `tags`, `notes`)
  - [ ] Implement CRUD controllers
- [ ] **Frontend (Mood)**
  - [ ] Design `DailyMoodInput` (Emoji scale/slider)
  - [ ] Create `MoodHistory` view (Calendar or List)
  - [ ] Implement `MoodStats` (Graph trend)
  - [ ] Integrate Mood API

## 7. Closet Tracker

- [ ] **Backend (Closet)**
  - [ ] Configure Image Upload (Multer + Cloudinary/AWS)
  - [ ] Create `ClosetItem` model
  - [ ] Implement CRUD controllers (include image handling)
  - [ ] Implement `wearItem` controller (increment counter)
- [ ] **Frontend (Closet)**
  - [ ] Design `ItemCard` (Image, Badge, Info)
  - [ ] Implement `ClosetGrid` (Responsive columns)
  - [ ] Create `AddItemModal` (Image upload, details form)
  - [ ] Integrate Closet API

## 8. Document Vault

- [ ] **Backend (Docs)**
  - [ ] Create `Document` model (`fileUrl`, `expiryDate`, `tags`)
  - [ ] Implement secure file upload controllers
  - [ ] Implement search/filter logic
- [ ] **Frontend (Docs)**
  - [ ] Design `DocList` view (Table/List with expiry highlights)
  - [ ] Create `UploadDocModal`
  - [ ] Implement filter sidebar (Categories)
  - [ ] Integrate Docs API

## 9. Polish & Quality Assurance

- [ ] **UI Polish**
  - [ ] Verify Mobile Responsiveness (Sidebar, Grid)
  - [ ] Check Accessibility (Contrast, Keyboard nav)
  - [ ] Implement Micro-interactions (Hover states, transitions)
- [ ] **Testing**
  - [ ] Test Auth flows (inclusive of edge cases)
  - [ ] Verify Timezone handling
  - [ ] Test File Uploads limits
- [ ] **Deployment**
  - [ ] Set up environment variables (Production)
  - [ ] Build Frontend
  - [ ] Deploy Backend
  - [ ] Deploy Frontend
