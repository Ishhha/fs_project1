# 🧠 Case Resolution Console — Web Frontend

Frontend of the Case Resolution Console built using **React + Vite + Tailwind CSS**.

---

## 🚀 Features

- Modern SPA using React Router
- Fully responsive UI with Tailwind CSS
- SSE-based live triage viewer
- Global context for authentication & triage sessions
- API integration with backend (`localhost:4000/api`)
- Fast development via Vite

---

## 🧱 Project Structure

```
src/
components/   → Navbar, Sidebar, Table, etc.
routes/       → Dashboard, Alerts, Customer, Eval, NotFound
hooks/        → useSSE, usePagination, useA11yFocus
utils/        → API helpers, formatters
context/      → AuthContext, TriageContext
assets/       → Icons, logos

```

---

## 🧩 Setup

### 1️⃣ Install dependencies
```bash
cd web
npm install
```

### 2️⃣ Run the development server

```bash
npm run dev
```

Vite will start at: [http://localhost:5173](http://localhost:5173)

> The dev server proxies API requests to `http://localhost:4000`.

---

## 🧾 Build for production

```bash
npm run build
```

Then preview locally:

```bash
npm run preview
```

---

## 🧰 Environment Variables

Create a `.env` in `web/` (optional):

```
VITE_API_URL=http://localhost:4000/api
```

---

## 📦 Deployment

To build a static production bundle:

```bash
npm run build
```

The build output will be located in `/dist`.

---

## 🧠 Integration with Backend

* Backend runs on port **4000**
* Frontend runs on port **5173**
* Vite proxy automatically forwards `/api` requests to backend

---

© 2025 — Zeta Fullstack + AI Assignment
