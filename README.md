<h1 align="center">📝 Blogs — A Modern Full Stack Blog Platform</h1>

<p align="center">
  <b>Built with Next.js, Express.js, Prisma, PostgreSQL & TypeScript</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js%2015+-blue?logo=nextdotjs&style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Express.js-green?logo=express&style=flat-square" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql&style=flat-square" />
  <img src="https://img.shields.io/badge/ORM-Prisma-orange?logo=prisma&style=flat-square" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript&style=flat-square" />
</p>

---

## 🌟 Overview

**Blogs** is a sleek, fully responsive full-stack blog platform where users can **register, log in, create, edit, and read posts**.  
It combines **Next.js (frontend)** with **Express.js (backend)**, powered by **Prisma ORM** and **PostgreSQL** for data management.

The interface features **modern glassmorphism**, smooth gradients, and an intuitive experience for both writers and readers.

---

## 🚀 Tech Stack

| Layer | Technology | Description |
|:------|:------------|:-------------|
| **Frontend** | [Next.js 15+ (App Router)](https://nextjs.org/) | Modern React framework with SSR & routing |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first responsive CSS framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| **Backend** | [Express.js](https://expressjs.com/) | RESTful API server |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database |
| **ORM** | [Prisma](https://www.prisma.io/) | Modern type-safe ORM |
| **Auth** | [JWT](https://jwt.io/) | Secure token-based authentication |
| **HTTP Client** | [Axios](https://axios-http.com/) | Smooth API communication |
| **Deployment** | [Vercel](https://vercel.com/) & [Render](https://render.com/) | Cloud hosting for both frontend & backend |


---

## 🧱 Project Structure

```

blog-app/
│
├── backend/               # Express + Prisma + PostgreSQL API
│   ├── src/
│   │   ├── index.ts               # Main server file
│   │   ├── prisma/schema.prisma   # Prisma schema
│   │   ├── controllers/           # Logic for each endpoint
│   │   │   ├── authController.ts
│   │   │   └── postController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts  # JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── postRoutes.ts
│   │   └── utils/
│   │       └── generateToken.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/             # Next.js 15 + TypeScript + Tailwind
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage (All posts)
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Register page
│   └── posts/
│       ├── [id]/page.tsx        # Single post view
│       └── edit/[id]/page.tsx   # Edit post page
├── components/
│   ├── Navbar.tsx               # Glassmorphic Navbar
│   ├── PostCard.tsx             # Post preview card
│   └── Footer.tsx
├── context/
│   └── AuthContext.tsx          # Global auth management
├── lib/
│   └── axios.ts                 # Axios instance
├── styles/
│   ├── globals.css
│   └── animation.css
├── package.json
└── tsconfig.json

````

---

## 🔐 Authentication Flow

### 🧍‍♂️ Register
**Endpoint:** `POST /api/auth/register`  
- Accepts `name, email, password`  
- Password hashed using `bcrypt`  
- Generates a `JWT` token upon success  

### 🔑 Login
**Endpoint:** `POST /api/auth/login`  
- Validates credentials  
- Returns `JWT` token for access  

### 🧭 Protected Routes
**Header:** `Authorization: Bearer <token>`  
- `authMiddleware` validates the token before granting access  

---

## 🧩 Prisma Schema

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
}
````

---

## 🧠 Backend Features

✅ User registration & login (JWT-based)
✅ Password hashing via **bcryptjs**
✅ Full CRUD for posts
✅ Authorization (only post authors can edit/delete)
✅ Prisma for data access
✅ Centralized error handling
✅ Fully written in TypeScript

---

## 🎨 Frontend Features

✅ Responsive **Next.js 15 (App Router)** architecture
✅ Styled with **Tailwind CSS + Glassmorphism**
✅ Persistent authentication via **AuthContext + localStorage**
✅ Dynamic routes for posts
✅ Create, read, edit, delete posts
✅ Protected pages (requires login)
✅ Animated, clean UI with consistent theme

---

## ⚙️ Environment Variables

### 🗄️ Backend `.env`

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/blogdb"
JWT_SECRET="your_secret_key"
PORT=5000
```

### 💻 Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

## 🧰 Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/blog-app.git
cd blog-app
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Server running on 👉 **[http://localhost:5000](http://localhost:5000)**

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend running on 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🌍 API Endpoints

| Method     | Endpoint             | Description       | Auth |
| :--------- | :------------------- | :---------------- | :--- |
| **POST**   | `/api/auth/register` | Register new user | ❌    |
| **POST**   | `/api/auth/login`    | Login user        | ❌    |
| **GET**    | `/api/posts`         | Get all posts     | ❌    |
| **GET**    | `/api/posts/:id`     | Get single post   | ❌    |
| **POST**   | `/api/posts`         | Create new post   | ✅    |
| **PUT**    | `/api/posts/:id`     | Update post       | ✅    |
| **DELETE** | `/api/posts/:id`     | Delete post       | ✅    |

---

## 💎 UI Highlights

✨ **Glass-effect Navbar** with dynamic login/logout state
🖋️ Clean “Create & Edit Post” form with animated buttons
📱 Fully responsive — optimized for desktop, tablet & mobile
🎨 Consistent color theme using `#A33CFC` and `#FC3EAA`
💬 Elegant message states for loading, success & error

---

## 📦 Deployment

| Platform                  | Description                                        |
| :------------------------ | :------------------------------------------------- |
| **Frontend (Next.js)**    | Deploy easily via **Vercel**                       |
| **Backend (Express.js)**  | Use **Render**, **Railway**, or **Fly.io**         |
| **Database (PostgreSQL)** | Host on **Neon** or **ElephantSQL** |

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and open a PR for new features, bug fixes, or UI improvements.

---

## 📜 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute this project as long as attribution is given.

---

<p align="center">💜 Built with passion using Next.js, Express, Prisma & PostgreSQL</p>
```

