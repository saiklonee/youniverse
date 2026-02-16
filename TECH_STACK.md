# 📄 tech_stack.md

## 1. Frontend

- React (Vite)
- React Router
- Redux Toolkit or React Query
- Axios
- Tailwind CSS
- Headless UI / Radix (optional)
- Chart.js or Recharts for graphs

Folder Structure (Frontend)

```
src/
 ├─ app/
 ├─ features/
 │   ├─ auth/
 │   ├─ sleep/
 │   ├─ mood/
 │   ├─ closet/
 │   └─ docs/
 ├─ layouts/
 ├─ components/
 ├─ pages/
 └─ utils/
```

---

## 2. Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer (file upload)
- Cloudinary or AWS S3 (file storage)

Folder Structure (Backend)

```
server/
 ├─ configs/
 ├─ models/
 ├─ routes/
 ├─ controllers/
 ├─ middlewares/
 ├─ utils/
 └─ index.js
```

---

## 3. Database

- MongoDB Atlas
- Indexed fields:
  - userId
  - userId + date (Sleep & Mood)

- Timestamps enabled
- Use string date format (YYYY-MM-DD) for daily records

---

## 4. Security

- HTTP-only cookies
- Secure flag in production
- SameSite configuration
- Password hashing with bcrypt
- Input validation (Zod or express-validator)
- Rate limiting middleware
- CORS whitelist

---

## 5. Deployment

Frontend:

- Vercel / Netlify

Backend:

- Render / Railway / VPS

Database:

- MongoDB Atlas

---

## 6. Performance Considerations

- Month-based queries only
- Proper indexing
- Lean queries
- Avoid storing large arrays in User document
- Separate collections per module
