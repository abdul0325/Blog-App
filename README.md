# 📝 Blogs — A Modern Full Stack Blog Platform (Next.js + Express + Prisma + PostgreSQL + TypeScript)

**Blogs** is a full-featured blogging platform built using **Next.js (frontend)** and **Express.js (backend)** with **TypeScript**, **Prisma ORM**, and **PostgreSQL**.  
It allows users to **register, log in, create, edit, delete, and read blog posts** with a sleek **glass-effect UI** and **JWT-based authentication**.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | [Next.js 15+ (App Router)](https://nextjs.org/) | Modern React framework for the client-side |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and scalability |
| **Backend** | [Express.js](https://expressjs.com/) | API layer for handling requests |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database |
| **ORM** | [Prisma](https://www.prisma.io/) | Type-safe database client |
| **Auth** | [JWT (JSON Web Tokens)](https://jwt.io/) | Secure, stateless authentication |
| **HTTP Client** | [Axios](https://axios-http.com/) | Easy HTTP requests from frontend |
| **Runtime** | [Node.js](https://nodejs.org/) | Server runtime for JavaScript/TypeScript |
| **Deployment** | [Vercel](https://vercel.com/) / [Render](https://render.com/) | Cloud hosting for app |

---

## 🧱 Project Structure

blog-app/
│
├── backend/ # Express + Prisma + PostgreSQL API
│ ├── src/
│ │ ├── index.ts # Entry point (Express server)
│ │ ├── prisma/
│ │ │ └── schema.prisma # Prisma database schema
│ │ ├── controllers/
│ │ │ ├── authController.ts # Handles register/login
│ │ │ └── postController.ts # Handles post CRUD
│ │ ├── middleware/
│ │ │ └── authMiddleware.ts # JWT verification
│ │ ├── routes/
│ │ │ ├── authRoutes.ts
│ │ │ └── postRoutes.ts
│ │ └── utils/
│ │ └── generateToken.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
│
└── frontend/ # Next.js 15 + TypeScript + Tailwind CSS
├── app/
│ ├── layout.tsx # Global layout
│ ├── page.tsx # All posts (home)
│ ├── login/page.tsx # Login page
│ ├── register/page.tsx # Register page
│ ├── posts/
│ │ ├── [id]/page.tsx # Single post details
│ │ └── edit/[id]/page.tsx # Edit post
├── context/
│ └── AuthContext.tsx # Global authentication state
├── lib/
│ └── axios.ts # Axios instance for API calls
├── components/
│ ├── Navbar.tsx # Glassmorphism navbar
│ ├── PostCard.tsx # Blog post card
│ └── Footer.tsx
├── styles/
│ ├── globals.css
│ └── animation.css
├── package.json
└── tsconfig.json


---

## 🔐 Authentication Workflow

1. **User Registration**  
   → POST `/api/auth/register`  
   → User provides `name, email, password`  
   → Password is **hashed using bcrypt**  
   → JWT is generated and returned  

2. **User Login**  
   → POST `/api/auth/login`  
   → On valid credentials, returns a JWT  

3. **Protected Routes**  
   → All requests with `Authorization: Bearer <token>`  
   → `authMiddleware` verifies the token before accessing routes  

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


🧠 Backend Features

✅ User registration & login with JWT
✅ Password hashing using bcryptjs
✅ Create, read, update, and delete posts
✅ Authorization — only the author can edit/delete their posts
✅ Error handling with clear response messages
✅ Prisma for database access
✅ TypeScript for all backend logic

🎨 Frontend Features

✅ Beautiful, responsive Next.js 15 app
✅ Styled with Tailwind CSS and gradients
✅ Glass-effect Navbar
✅ Authentication using AuthContext and localStorage
✅ Create, view, edit, and delete blog posts
✅ Protected post creation & editing
✅ Dynamic routing (/posts/[id], /posts/edit/[id])
✅ Axios API integration

⚙️ Environment Variables
Backend .env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/blogdb"
JWT_SECRET="your_jwt_secret_key"
PORT=5000

Frontend .env.local
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

🧰 Setup Instructions
1️⃣ Clone the Project
git clone https://github.com/yourusername/blog-app.git
cd blog-app

2️⃣ Setup Backend
cd backend
npm install
npx prisma migrate dev
npm run dev


Backend runs on http://localhost:5000

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend runs on http://localhost:3000

🌍 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/posts	Get all posts	❌
GET	/api/posts/:id	Get single post	❌
POST	/api/posts	Create new post	✅
PUT	/api/posts/:id	Update post	✅
DELETE	/api/posts/:id	Delete post	✅
