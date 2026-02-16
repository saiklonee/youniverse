# 📄 PRD.md

**Project Name:** Youniverse
**Type:** Personal Life Operating System
**Tech:** MERN Stack

---

## 1. Vision

Youniverse is a personal digital universe where users can track daily life data, manage belongings, and securely store important documents in one structured, private system.

The goal is to build a modular, scalable foundation starting with:

- Sleep Tracker
- Mood Tracker
- Closet Tracker
- Document Vault

Future modules can plug into the same architecture.

---

## 2. Target User

- College students
- Young professionals
- Organized self-improvement focused users
- People who want a structured digital life dashboard

---

## 3. Core Modules (Phase 1)

### 3.1 Authentication

- Signup (email + password)
- Login
- JWT-based session (HTTP-only cookie)
- Logout
- Protected routes
- User timezone support

---

### 3.2 Dashboard (Home Layout)

After login, users land on:

**Overview Cards:**

- Sleep summary (last 7 days average)
- Mood summary (weekly trend)
- Closet quick stats (total items, most worn)
- Docs summary (expiring soon)

This is a high-level life dashboard.

---

### 3.3 Sleep Tracker (Phase 1 priority)

#### Goal

Track daily sleep intervals and display monthly timeline view like a log graph.

#### Features

- Monthly calendar view (1–31)
- 24-hour horizontal timeline per day
- Multiple sleep segments (main + nap)
- Sleep quality rating (1–5)
- Notes
- Monthly average calculation
- Editable per day

#### User Actions

- Add sleep start & end time
- Add nap
- Edit existing entries
- Delete segments
- Switch month

#### Analytics

- Total sleep per day
- Monthly average sleep
- Longest sleep streak
- Sleep consistency (optional future)

---

### 3.4 Mood Tracker

#### Goal

Track emotional state daily with optional notes and tags.

#### Features

- One entry per day
- Mood scale (1–10 or emoji-based)
- Tags (e.g., stressed, productive, tired)
- Notes
- Weekly and monthly graph
- Correlate with sleep (future feature)

#### Analytics

- Mood average per week/month
- Mood trend graph
- Mood streak

---

### 3.5 Closet Tracker

#### Goal

Digitally catalog wardrobe and track usage.

#### Features

- Add clothing item (image upload)
- Categories (shirt, jeans, shoes, etc.)
- Brand, color, size
- Date purchased
- Usage tracking (mark as worn)
- Basic usage analytics

#### Analytics

- Most worn items
- Least used items
- Total wardrobe value (optional)

---

### 3.6 Document Vault

#### Goal

Secure storage for important personal and college documents.

#### Categories

- College documents
- Personal documents
- IDs
- Certificates

#### Features

- File upload (cloud storage)
- Tagging
- Expiry date reminder
- Search
- Download

---

## 4. Functional Requirements

### Authentication

- Secure password hashing
- JWT authentication
- HTTP-only cookie storage
- Route protection middleware

### Sleep

- One record per user per date
- Multiple segments per date
- Unique index (userId + date)

### Mood

- One entry per user per date
- Quick edit system

### Closet

- Many items per user
- Image storage
- Track wear history

### Docs

- Secure upload
- Private per user
- Expiry tracking

---

## 5. Non-Functional Requirements

- Mobile-first responsive UI
- Clean minimal UI
- Fast month queries (indexed database)
- Timezone-safe date handling
- Scalable schema design
- Modular codebase
- Future-ready for analytics expansion

---

## 6. Data Model Overview

### User

- id
- name
- username
- email
- passwordHash
- timezone

### SleepDay

- userId
- date (YYYY-MM-DD string)
- segments [{ start, end, type }]
- quality
- notes

### MoodEntry

- userId
- date
- moodScore
- tags[]
- notes

### ClosetItem

- userId
- title
- category
- imageUrls[]
- brand
- color
- size
- purchaseDate
- wearCount
- notes

### Document

- userId
- title
- category
- fileUrl
- tags[]
- expiryDate

---

## 7. Future Roadmap

- Habit tracker
- Journal
- Goal system
- AI insights
- Sleep vs mood correlation
- Outfit suggestions
- Mobile app version

---
