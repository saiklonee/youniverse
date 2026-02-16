# Youniverse – UI Design Document

Version 1.0

---

## 1. Design Philosophy

Youniverse should feel like a calm, personal digital space.

Tone:

- Minimal
- Soft
- Structured
- Personal
- Data-first

This is not a corporate dashboard. It should feel like a private life journal with structure.

---

## 2. Visual Identity

### 2.1 Color System

Primary: Soft Indigo / Lavender
Secondary: Muted Green (Sleep)
Accent Colors:

- Sleep → Green
- Mood → Yellow / Orange
- Closet → Blue
- Docs → Purple

Background:

- Light mode → Off-white (#F8F9FB)
- Dark mode → Soft charcoal (#111418)

Cards:

- White or slightly elevated neutral

Avoid high contrast neon tones.

---

### 2.2 Typography

Font:

- Inter / SF Pro style clean sans-serif

Hierarchy:

- H1: 28–32px bold
- H2: 22–24px semi-bold
- Body: 14–16px
- Caption: 12px

Text should feel light, not heavy.

---

### 2.3 Spacing System

Use 8px grid system.

Padding:

- Cards → 16–24px
- Sections → 32px vertical spacing

Rounded corners:

- Cards → 16px
- Buttons → 12px

---

## 3. Layout System

### 3.1 Landing Page

Sections:

1. Hero
   - App name: Youniverse
   - Tagline
   - CTA: “Enter your universe”
   - Minimal illustration

2. Feature Preview
   - Sleep preview
   - Mood preview
   - Closet preview
   - Docs preview

3. Footer
   - Simple links
   - No clutter

Clean vertical layout.

---

### 3.2 Authentication Page

Centered card layout.

Elements:

- Logo / App name
- Toggle: Login / Signup
- Inputs
- Primary button
- Subtle helper text

Minimal distractions.

---

## 4. App Shell Design

After login:

Layout:

Left Sidebar
Top Bar
Main Content Area

## 4.1 Sidebar

Vertical navigation.

Items:

- Home
- Sleep
- Mood
- Closet
- Docs
- Profile

Design:

- Icon + Label
- Active state with soft background highlight
- Collapsible on smaller screens

---

## 4.2 Top Bar

Contains:

- Month selector (for trackers)
- Search (for docs/closet)
- User avatar dropdown

Minimal height.

---

## 5. Home Dashboard UI

Purpose:
High-level overview of life data.

Layout:
Grid of cards.

Cards:

1. Sleep Summary
   - Last 7 day average
   - Small mini bar chart

2. Mood Summary
   - Weekly average
   - Mini line graph

3. Closet Summary
   - Total items
   - Most worn

4. Docs Summary
   - Expiring soon indicator

Each card:

- Icon
- Metric
- Small visual chart
- Clickable

---

## 6. Sleep Tracker UI

This is the primary module.

### 6.1 Month View Layout

Top:

- Month selector (← February 2026 →)

Main:

- Vertical list from 1 to 31
- Each row represents one day
- Horizontal 24-hour timeline

Design Structure per Row:

[ Day Number ] [ 24h Timeline Bar ]

Timeline:

- 0 to 24 hour scale
- Light background grid
- Sleep segments shown as green blocks
- Slight rounded corners

Dashed vertical line at:

- 12 AM
- 6 AM
- 12 PM
- 6 PM

Interaction:

- Click day → open side drawer / modal
- Edit segments visually or via time inputs

---

### 6.2 Add / Edit Sleep Modal

Fields:

- Sleep Start Time
- Sleep End Time
- Add Nap button
- Quality selector (1–5 stars)
- Notes textarea
- Save button

Design:

- Clean vertical form
- Subtle shadow modal
- Smooth animation

---

### 6.3 Analytics Section (Below Month View)

- Monthly average sleep
- Longest streak
- Bar graph per week

Graph style:

- Soft green bars
- No heavy gridlines

---

## 7. Mood Tracker UI

### 7.1 Daily Entry

Main input:
Large emoji scale or slider.

Layout:
[ Emoji Row ]
[ Optional Tags ]
[ Notes Field ]
[ Save ]

Minimal friction.

---

### 7.2 Mood History

Calendar view or vertical list.

Graph:

- Line chart across month
- Smooth curve
- Soft yellow/orange line

Optional:
Overlay sleep correlation in future.

---

## 8. Closet Tracker UI

### 8.1 Item Grid

Grid layout:
3–4 columns on desktop
2 columns on tablet
1 on mobile

Card:

- Image
- Name
- Category tag
- Wear count badge

Hover:

- Quick edit
- Mark as worn

---

### 8.2 Add Item Modal

- Upload image
- Title
- Category
- Color
- Brand
- Save

Minimal.

---

## 9. Document Vault UI

Layout:
List + Filter sidebar.

Columns:

- Title
- Category
- Expiry date
- Download button

Visual:

- Expiring soon highlighted in soft red

Upload:
Floating + button.

---

## 10. Interaction Design

Animations:

- 150–250ms ease transitions
- Smooth page transitions
- No aggressive motion

Microinteractions:

- Button hover subtle elevation
- Timeline blocks slightly expand on hover
- Save success checkmark animation

---

## 11. Responsive Design

Mobile behavior:

Sidebar → bottom navigation
Timeline → horizontally scrollable
Cards stack vertically

Priority:
Functionality first, no clutter.

---

## 12. Empty States

Important for early phase.

Sleep:
“Start tracking your sleep”

Mood:
“How are you feeling today?”

Closet:
“Add your first item”

Docs:
“Upload your first document”

Use soft illustrations or simple icons.

---

## 13. Accessibility

- Minimum 4.5:1 contrast ratio
- Keyboard navigation support
- Focus states visible
- Button hit areas ≥ 40px

---

## 14. Design Consistency Rules

1. All trackers use same card design language
2. Month selectors look identical across modules
3. Modals follow same structure
4. Buttons use same variant system

Primary button
Secondary button
Danger button

---

## 15. Future UI Enhancements

- Dark mode toggle
- Custom themes
- Drag-to-create sleep segments
- Drag-and-drop closet organization
- Insights dashboard
